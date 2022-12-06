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
exports.JesusTwitterService = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bearerToken = process.env.JESUS_BEARER_TOKEN;
const pstIrenTwitterId = process.env.PST_IREN_TWITTER_ID;
const jesusTwitterId = process.env.JESUS_TWITTER_ID;
const appKey = process.env.JESUS_API_KEY;
const appSecret = process.env.JESUS_API_KEY_SECRET;
const accessToken = process.env.JESUS_ACCESS_TOKEN;
const accessSecret = process.env.JESUS_ACCESS_TOKEN_SECRET;
class JesusTwitterService {
    constructor() {
        this.twitterServiceV2 = new twitter_api_v2_1.TwitterApi(bearerToken).readWrite.v2;
        this.twitterServiceV1 = new twitter_api_v2_1.TwitterApi({
            appKey,
            appSecret,
            accessToken,
            accessSecret,
        }).readWrite.v2;
    }
    getIrenTweets(pagination_token = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.twitterServiceV2.userTimeline(pstIrenTwitterId, {
                    exclude: ["replies", "retweets"],
                    max_results: 100,
                    "tweet.fields": ["created_at", "id", "attachments"],
                    pagination_token,
                    start_time: "2010-11-06T00:00:00Z",
                });
                const tweets = response.data.data;
                return { tweets, pagination_token: response.data.meta.next_token };
            }
            catch (err) {
                console.log(err);
                return { tweets: [], pagination_token: undefined };
            }
        });
    }
    likeTweet(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.twitterServiceV1.like(jesusTwitterId, tweetId);
                return true;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    retweetTweet(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.twitterServiceV1.retweet(jesusTwitterId, tweetId);
                return true;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getTweetById(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.twitterServiceV2.singleTweet(tweetId);
            return { tweet: res.data };
        });
    }
    tweetCountDown() {
        return __awaiter(this, void 0, void 0, function* () {
            const rebootCampStartDate = new Date("2022-12-09");
            const todayDate = new Date();
            const tweetContent = `${rebootCampStartDate.getDay() - todayDate.getDay()} DAY${rebootCampStartDate.getDay() - todayDate.getDay() > 1 ? "S" : ""} TILL REBOOT CAMP 🔥🔥🔥\n\n#PstIrenSaid #RebootCamp #Contagious\n@cci__global`;
            yield this.twitterServiceV1.tweet(tweetContent, {
                media: { media_ids: ["1599957504967991303", "1599957517064339457"] },
            });
            return tweetContent;
        });
    }
}
exports.JesusTwitterService = JesusTwitterService;
