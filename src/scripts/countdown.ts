import { JesusTwitterService } from "../services/twitter/jesus-bot.service";

const jesusTwitterService = new JesusTwitterService();

const rebootCampStartDate = new Date("2022-12-09");
const todayDate = new Date();
if (rebootCampStartDate.getTime() - todayDate.getTime() > 0) {
  jesusTwitterService.tweetCountDown().then((content) => {
    process.exit();
  });
}
