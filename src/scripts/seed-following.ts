import { Prisma, PrismaClient } from "@prisma/client";
import { UserV2 } from "twitter-api-v2";
import { NexusService } from "../services/twitter/nexus.service";

const nexusService = new NexusService();
const prisma = new PrismaClient();

let followingArr: Prisma.FollowerCreateManyInput[] = [];
const seed = async () => {
  console.log("start".toUpperCase());
  let pagination_token;
  const { followers, pagination_token: token } =
    await nexusService.getFollowers(undefined, 1000);

  pagination_token = token;

  followers.forEach((f) => {
    followingArr.push({
      twitterId: f.id,
      username: f.username,
    });
  });

  while (pagination_token) {
    console.log(pagination_token, followingArr.length);
    const res: { followers: UserV2[]; pagination_token: string | undefined } =
      await nexusService.getFollowers(pagination_token, 1000);

    res.followers.forEach((f) => {
      followingArr.push({
        twitterId: f.id,
        username: f.username,
      });
    });

    pagination_token = res.pagination_token;
  }

  console.log(followingArr.length);
};

seed().then(async () => {
  await prisma.follower.createMany({
    data: followingArr,
  });

  console.log("DONE");
  process.exit();
});
