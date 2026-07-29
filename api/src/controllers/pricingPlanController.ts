import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const prisma = new PrismaClient();

const pricingPlanSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive'),
    originalPrice: z.number().positive().optional().nullable(),
    durationMonths: z.number().int().min(1).max(120),
    trialDays: z.number().int().min(0).max(730).default(0),
    features: z.array(z.string()).default([]),
    isActive: z.boolean().default(true),
    isHighlighted: z.boolean().default(false),
    sortOrder: z.number().int().default(0),
});

export const getAllPricingPlans = async (_req: Request, res: Response) => {
    try {
        const plans = await prisma.pricingPlan.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ success: true, data: plans });
    } catch (error) {
        console.error('Error fetching pricing plans:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch pricing plans' });
    }
};

export const getAllPricingPlansAdmin = async (_req: Request, res: Response) => {
    try {
        const plans = await prisma.pricingPlan.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        res.json({ success: true, data: plans });
    } catch (error) {
        console.error('Error fetching admin pricing plans:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch pricing plans' });
    }
};

export const getPricingPlanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const plan = await prisma.pricingPlan.findUnique({ where: { id } });
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Pricing plan not found' });
        }
        res.json({ success: true, data: plan });
    } catch (error) {
        console.error('Error fetching pricing plan:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch pricing plan' });
    }
};

export const createPricingPlan = async (req: Request, res: Response) => {
    try {
        const data = pricingPlanSchema.parse(req.body);
        const plan = await prisma.pricingPlan.create({ data });
        res.status(201).json({ success: true, data: plan });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
            });
        }
        console.error('Error creating pricing plan:', error);
        res.status(500).json({ success: false, message: 'Failed to create pricing plan' });
    }
};

export const updatePricingPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = pricingPlanSchema.partial().parse(req.body);
        const plan = await prisma.pricingPlan.update({ where: { id }, data });
        res.json({ success: true, data: plan });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
            });
        }
        console.error('Error updating pricing plan:', error);
        res.status(500).json({ success: false, message: 'Failed to update pricing plan' });
    }
};

export const deletePricingPlan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const plan = await prisma.pricingPlan.update({
            where: { id },
            data: { isActive: false },
        });
        res.json({ success: true, data: plan, message: 'Pricing plan archived' });
    } catch (error) {
        console.error('Error deleting pricing plan:', error);
        res.status(500).json({ success: false, message: 'Failed to delete pricing plan' });
    }
};
