import * as dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";

dotenv.config();
const bearerToken: string = <string>process.env.NEXUS_BEARER_TOKEN;
const nexusTwitterId: string = <string>process.env.NEXUS_TWITTER_ID;
const appKey: string = <string>process.env.NEXUS_API_KEY;
const appSecret: string = <string>process.env.NEXUS_API_KEY_SECRET;
const accessToken: string = <string>process.env.NEXUS_ACCESS_TOKEN;
const accessSecret: string = <string>process.env.NEXUS_ACCESS_TOKEN_SECRET;

export class NexusService {
  private twitterServiceV2 = new TwitterApi(bearerToken).readWrite.v2;
  private twitterServiceV1 = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  }).readWrite.v2;
  // Un-follows everyone not following me
  public async getFollowing(
    pagination_token?: string | undefined,
    max_results = 5
  ) {
    const response = await this.twitterServiceV1.following(nexusTwitterId, {
      max_results,
      pagination_token,
    });

    return {
      following: response.data,
      pagination_token: response.meta.next_token,
    };
  }

  public async getFollowers(
    pagination_token?: string | undefined,
    max_results = 5
  ) {
    const response = await this.twitterServiceV1.followers(nexusTwitterId, {
      max_results,
      pagination_token,
    });

    return {
      followers: response.data,
      pagination_token: response.meta.next_token,
    };
  }

  public async kamikaze(targetId: string) {
    try {
      const res = await this.twitterServiceV1.unfollow(
        nexusTwitterId,
        targetId
      );

      return res.data.following;
    } catch (err: any) {
      console.log({ err, req: err.request });
    }
  }
}
