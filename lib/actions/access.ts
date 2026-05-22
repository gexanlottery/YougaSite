import { prisma } from '../prisma'

export async function hasActiveAccess(userId: string): Promise<boolean> {
  const access = await prisma.userAccess.findFirst({
    where: {
      userId,
      endDate: { gt: new Date() },
    },
  })
  return !!access
}

export async function getActiveAccess(userId: string) {
  return prisma.userAccess.findFirst({
    where: {
      userId,
      endDate: { gt: new Date() },
    },
    include: { plan: true },
    orderBy: { endDate: 'desc' },
  })
}
