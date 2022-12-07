import { unFollow } from "./scripts/unfollow";
import { JesusTwitterService } from "./services/twitter/jesus-bot.service";
import { NexusService } from "./services/twitter/nexus.service";
import * as cron from "node-cron";

const nexusService = new NexusService();

// nexusService.getFollowing();
// let count = 1;
// const task = cron.schedule("*/16 * * * *", async () => {
//   try {
//     await unFollow();
//     console.log(count);
//     count++;
//   } catch (err) {
//     console.log(err);
//   }
// });

// task.start();
// jesusTwitterService.getIrenTweets();

try {
  unFollow();
} catch (err: any) {
  console.log(err.request);
}
