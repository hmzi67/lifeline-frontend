import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.userExerciseProgress.deleteMany({});
  console.log('Deleted progress:', p.count);
  const d = await prisma.exercisePlanSchedule.deleteMany({});
  console.log('Deleted schedules:', d.count);
}

main().then(() => prisma.$disconnect());
