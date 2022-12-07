import { PrismaClient } from "@prisma/client";
import { NexusService } from "../services/twitter/nexus.service";

const nexusService = new NexusService();
const prisma = new PrismaClient();

export const unFollow = async () => {
  const bastards = await prisma.naughtyUser.findMany({
    take: 50,
    where: { isUnfollowed: false },
  });

  for (let bastard of bastards) {
    await nexusService.kamikaze(bastard.twitterId).then(async (following) => {
      await prisma.naughtyUser.update({
        where: { id: bastard.id },
        data: { isUnfollowed: !following },
      });
    });
  }
};
