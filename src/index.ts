import { unFollow } from "./scripts/unfollow";
import { JesusTwitterService } from "./services/twitter/jesus-bot.service";
import { NexusService } from "./services/twitter/nexus.service";
import * as cron from "node-cron";

const nexusService = new NexusService();

// nexusService.getFollowing();
let count = 1;
console.log(count, new Date().toLocaleString());
unFollow().then(() => {
  const task = cron.schedule("*/20 * * * *", async () => {
    try {
      count++;
      console.log("START", count, new Date().toLocaleString());
      await unFollow();
      console.log("END", count, new Date().toLocaleString());
    } catch (err) {
      console.log(err);
    }
  });

  task.start();
});
