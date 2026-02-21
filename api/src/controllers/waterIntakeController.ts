import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type Id = string;

interface CreateWaterIntakeBody {
  userId?: Id | null;
  date?: string | null;       // ISO date: YYYY-MM-DD
  timeStart?: string | null;  // HH:MM
  timeEnd?: string | null;    // HH:MM
}

interface UpdateWaterIntakeBody extends Partial<CreateWaterIntakeBody> {}

interface PaginationQuery {
  page?: string;  // number as string
  limit?: string; // number as string
}

interface ListQuery extends PaginationQuery {
  userId?: Id;
  date?: string; // YYYY-MM-DD or ISO
}

interface GetByUserParams {
  userId: Id;
}

interface IdParams {
  id: Id;
}

class WaterIntakeController {
  // Create new water intake log
  async createWaterIntake(
    req: Request<unknown, unknown, CreateWaterIntakeBody>,
    res: Response
  ): Promise<void> {
    try {
      const { userId, date, timeStart, timeEnd } = req.body;

      if (userId) {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!userExists) {
          res.status(404).json({
            success: false,
            message: "User not found",
          });
          return;
        }
      }

      const waterIntake = await prisma.waterIntakeLog.create({
        data: {
          userId: userId ?? null,
          date: date ? new Date(date) : null,
          timeStart: timeStart
            ? new Date(`1970-01-01T${timeStart}:00.000Z`)
            : null,
          timeEnd: timeEnd ? new Date(`1970-01-01T${timeEnd}:00.000Z`) : null,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Water intake log created successfully",
        data: waterIntake,
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error creating water intake:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  // Get all water intake logs with optional filtering
  async getAllWaterIntakes(
    req: Request<unknown, unknown, unknown, ListQuery>,
    res: Response
  ): Promise<void> {
    try {
      const { userId, date, page = "1", limit = "10" } = req.query;
      const pageNum = Number.parseInt(page, 10) || 1;
      const limitNum = Math.max(1, Number.parseInt(limit, 10) || 10);
      const skip = (pageNum - 1) * limitNum;

      const where: Prisma.WaterIntakeLogWhereInput = {};
      if (userId) where.userId = userId;
      if (date) {
        const filterDate = new Date(date);
        const start = new Date(filterDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filterDate);
        end.setHours(23, 59, 59, 999);
        where.date = { gte: start, lt: end };
      }

      const [waterIntakes, totalCount] = await Promise.all([
        prisma.waterIntakeLog.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: {
            date: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
              },
            },
          },
        }),
        prisma.waterIntakeLog.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      res.status(200).json({
        success: true,
        message: "Water intake logs retrieved successfully",
        data: waterIntakes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error fetching water intakes:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  // Get water intake log by ID
  async getWaterIntakeById(
    req: Request<IdParams>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;

      const waterIntake = await prisma.waterIntakeLog.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      if (!waterIntake) {
        res.status(404).json({
          success: false,
          message: "Water intake log not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Water intake log retrieved successfully",
        data: waterIntake,
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error fetching water intake:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  // Get water intake logs by user ID
  async getWaterIntakesByUserId(
    req: Request<GetByUserParams, unknown, unknown, PaginationQuery & { date?: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { date, page = "1", limit = "10" } = req.query;

      const pageNum = Number.parseInt(page, 10) || 1;
      const limitNum = Math.max(1, Number.parseInt(limit, 10) || 10);
      const skip = (pageNum - 1) * limitNum;

      const where: Prisma.WaterIntakeLogWhereInput = { userId };
      if (date) {
        const filterDate = new Date(date);
        const start = new Date(filterDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filterDate);
        end.setHours(23, 59, 59, 999);
        where.date = { gte: start, lt: end };
      }

      const [waterIntakes, totalCount] = await Promise.all([
        prisma.waterIntakeLog.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { date: "desc" },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
              },
            },
          },
        }),
        prisma.waterIntakeLog.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      res.status(200).json({
        success: true,
        message: "User water intake logs retrieved successfully",
        data: waterIntakes,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error fetching user water intakes:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  // Update water intake log
  async updateWaterIntake(
    req: Request<IdParams, unknown, UpdateWaterIntakeBody>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { userId, date, timeStart, timeEnd } = req.body;

      const existingWaterIntake = await prisma.waterIntakeLog.findUnique({
        where: { id },
      });

      if (!existingWaterIntake) {
        res.status(404).json({
          success: false,
          message: "Water intake log not found",
        });
        return;
      }

      if (userId && userId !== existingWaterIntake.userId) {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!userExists) {
          res.status(404).json({
            success: false,
            message: "User not found",
          });
          return;
        }
      }

      const updateData: Prisma.WaterIntakeLogUpdateInput = {};
      if (userId !== undefined) updateData.user = userId ? { connect: { id: userId } } : undefined;
      if (date !== undefined) updateData.date = date ? new Date(date) : null;
      if (timeStart !== undefined)
        updateData.timeStart = timeStart
          ? new Date(`1970-01-01T${timeStart}:00.000Z`)
          : null;
      if (timeEnd !== undefined)
        updateData.timeEnd = timeEnd
          ? new Date(`1970-01-01T${timeEnd}:00.000Z`)
          : null;

      const updatedWaterIntake = await prisma.waterIntakeLog.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "Water intake log updated successfully",
        data: updatedWaterIntake,
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error updating water intake:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }

  // Delete water intake log
  async deleteWaterIntake(
    req: Request<IdParams>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;

      const existingWaterIntake = await prisma.waterIntakeLog.findUnique({
        where: { id },
      });

      if (!existingWaterIntake) {
        res.status(404).json({
          success: false,
          message: "Water intake log not found",
        });
        return;
      }

      await prisma.waterIntakeLog.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Water intake log deleted successfully",
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error deleting water intake:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}

const controller = new WaterIntakeController();
export default controller;
