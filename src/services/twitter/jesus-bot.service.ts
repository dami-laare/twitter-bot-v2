import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";

dotenv.config();
const bearerToken: string = <string>process.env.JESUS_BEARER_TOKEN;
const pstIrenTwitterId: string = <string>process.env.PST_IREN_TWITTER_ID;
const jesusTwitterId: string = <string>process.env.JESUS_TWITTER_ID;
const appKey: string = <string>process.env.JESUS_API_KEY;
const appSecret: string = <string>process.env.JESUS_API_KEY_SECRET;
const accessToken: string = <string>process.env.JESUS_ACCESS_TOKEN;
const accessSecret: string = <string>process.env.JESUS_ACCESS_TOKEN_SECRET;

export class JesusTwitterService {
  private twitterServiceV2 = new TwitterApi(bearerToken).readWrite.v2;
  private twitterServiceV1 = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  }).readWrite.v2;

  public async getIrenTweets(pagination_token: string | undefined = undefined) {
    try {
      const response = await this.twitterServiceV2.userTimeline(
        pstIrenTwitterId,
        {
          exclude: ["replies", "retweets"],
          max_results: 100,
          "tweet.fields": ["created_at", "id", "attachments"],
          pagination_token,
          start_time: "2010-11-06T00:00:00Z",
        }
      );

      const tweets = response.data.data;

      return { tweets, pagination_token: response.data.meta.next_token };
    } catch (err) {
      console.log(err);
      return { tweets: [], pagination_token: undefined };
    }
  }

  public async likeTweet(tweetId: string): Promise<any | boolean> {
    try {
      await this.twitterServiceV1.like(jesusTwitterId, tweetId);
      return true;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  public async retweetTweet(tweetId: string): Promise<any | boolean> {
    try {
      await this.twitterServiceV1.retweet(jesusTwitterId, tweetId);
      return true;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  public async getTweetById(tweetId: string) {
    const res = await this.twitterServiceV2.singleTweet(tweetId);

    return { tweet: res.data };
  }

  public async tweetCountDown() {
    const rebootCampStartDate = new Date("2022-12-09");
    const todayDate = new Date();
    const tweetContent = `${
      rebootCampStartDate.getDay() - todayDate.getDay()
    } DAY${
      rebootCampStartDate.getDay() - todayDate.getDay() > 1 ? "S" : ""
    } TILL REBOOT CAMP 🔥🔥🔥\n\n#PstIrenSaid #RebootCamp #Contagious\n@cci__global`;

    await this.twitterServiceV1.tweet(tweetContent, {
      media: { media_ids: ["1599957504967991303", "1599957517064339457"] },
    });
    return tweetContent;
  }
}
