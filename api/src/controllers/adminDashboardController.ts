import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const now = new Date();

    const [
      totalUsers,
      newUsersThisMonth,
      verifiedUsers,
      usersByStatus,
      totalDietPlans,
      totalExercises,
      totalMeditations,
      totalSleepStories,
      totalSleepSounds,
      totalBlogs,
      totalChallenges,
      activeSubscriptions,
      totalRevenue,
      recentPayments,
      challengesJoined,
      totalReferralCodes,
      totalCoupons,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.user.count({
        where: { isEmailVerified: true },
      }),
      prisma.user.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.dietPlan.count(),
      prisma.exercise.count(),
      prisma.meditation.count(),
      prisma.sleepStory.count(),
      prisma.sleepSound.count(),
      prisma.blog.count(),
      prisma.challenge.count(),
      prisma.subscriptionPayment.count({
        where: { status: 'COMPLETED' },
      }),
      prisma.subscriptionPayment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      prisma.subscriptionPayment.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, username: true, email: true },
          },
        },
      }),
      prisma.userChallenge.count(),
      prisma.referralCode.count(),
      prisma.couponCode.count(),
    ]);

    // Get daily user growth for the last 30 days
    const dailyGrowth: Array<{ date: string; count: number }> = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const count = await prisma.user.count({
        where: {
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
      });

      dailyGrowth.push({
        date: startOfDay.toISOString().split('T')[0],
        count,
      });
    }

    // Build status map
    const statusMap: Record<string, number> = {};
    usersByStatus.forEach((item) => {
      if (item.status) {
        statusMap[item.status] = item._count.status;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          newThisMonth: newUsersThisMonth,
          verified: verifiedUsers,
          verificationRate:
            totalUsers > 0
              ? parseFloat(((verifiedUsers / totalUsers) * 100).toFixed(1))
              : 0,
          byStatus: {
            active: statusMap['active'] || 0,
            pending: statusMap['pending'] || 0,
            blocked: statusMap['blocked'] || 0,
          },
          dailyGrowth,
        },
        content: {
          dietPlans: totalDietPlans,
          exercises: totalExercises,
          meditations: totalMeditations,
          sleepStories: totalSleepStories,
          sleepSounds: totalSleepSounds,
          blogs: totalBlogs,
          challenges: totalChallenges,
        },
        subscriptions: {
          active: activeSubscriptions,
          totalRevenue: totalRevenue._sum.amount || 0,
          recentPayments: recentPayments.map((p) => ({
            id: p.id,
            username: p.user?.username ?? 'Unknown',
            planName: p.planName ?? 'Unknown Plan',
            amount: p.amount ? p.amount.toNumber() : 0,
            method: p.method ?? 'Unknown',
            status: p.status ?? 'Unknown',
            createdAt: p.createdAt ?? new Date(),
          })),
        },
        engagement: {
          challengesJoined,
          referralCodes: totalReferralCodes,
          coupons: totalCoupons,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
    });
  }
};
