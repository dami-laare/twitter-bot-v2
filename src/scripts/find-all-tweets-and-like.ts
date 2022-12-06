import { Prisma, Tweet } from ".prisma/client";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { TweetV2 } from "twitter-api-v2/dist/types";
import { JesusTwitterService } from "../services/twitter/jesus-bot.service";

dotenv.config();
const prisma = new PrismaClient();

const tweets: Prisma.TweetCreateManyInput[] = [];
const findAllTweetsAndLike = async () => {
  console.info("STARTED");
  const jesusTwitterService = new JesusTwitterService();
  let pagination_token: string | undefined;
  const data = await jesusTwitterService.getIrenTweets();

  data.tweets.forEach((tweet) => {
    tweets.push({
      twitterId: tweet.id,
      dateTweeted: new Date(tweet.created_at as string),
    });
  });

  let count = 1;

  pagination_token = <string>data.pagination_token;

  while (pagination_token) {
    console.log({ count, pagination_token });
    const response: {
      tweets: TweetV2[];
      pagination_token: string | undefined;
    } = await jesusTwitterService.getIrenTweets(pagination_token);

    response.tweets.forEach((tweet) => {
      tweets.push({
        twitterId: tweet.id,
        dateTweeted: new Date(tweet.created_at as string),
      });
    });

    count += 1;
    pagination_token = response.pagination_token;
  }
};

const bootstrap = async () => {
  await findAllTweetsAndLike();
  await prisma.tweet.createMany({ data: [...tweets], skipDuplicates: true });
};

bootstrap();
