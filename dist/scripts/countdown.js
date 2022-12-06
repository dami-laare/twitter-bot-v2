"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jesus_bot_service_1 = require("../services/twitter/jesus-bot.service");
const jesusTwitterService = new jesus_bot_service_1.JesusTwitterService();
const rebootCampStartDate = new Date("2022-12-09");
const todayDate = new Date();
if (rebootCampStartDate.getTime() - todayDate.getTime()) {
    jesusTwitterService.tweetCountDown().then((content) => {
        process.exit();
    });
}
