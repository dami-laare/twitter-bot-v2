"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
const jesus_bot_service_1 = require("../services/twitter/jesus-bot.service");
dotenv.config();
const prisma = new client_1.PrismaClient();
const tweets = [];
const findAllTweetsAndLike = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info("STARTED");
    const jesusTwitterService = new jesus_bot_service_1.JesusTwitterService();
    let pagination_token;
    const data = yield jesusTwitterService.getIrenTweets();
    data.tweets.forEach((tweet) => {
        tweets.push({
            twitterId: tweet.id,
            dateTweeted: new Date(tweet.created_at),
        });
    });
    let count = 1;
    pagination_token = data.pagination_token;
    while (pagination_token) {
        console.log({ count, pagination_token });
        const response = yield jesusTwitterService.getIrenTweets(pagination_token);
        response.tweets.forEach((tweet) => {
            tweets.push({
                twitterId: tweet.id,
                dateTweeted: new Date(tweet.created_at),
            });
        });
        count += 1;
        pagination_token = response.pagination_token;
    }
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield findAllTweetsAndLike();
    yield prisma.tweet.createMany({ data: [...tweets], skipDuplicates: true });
});
bootstrap();
