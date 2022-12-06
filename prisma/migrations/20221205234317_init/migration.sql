-- CreateTable
CREATE TABLE "tweets" (
    "id" TEXT NOT NULL,
    "twitter_id" TEXT NOT NULL,
    "date_tweeted" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tweets_id_key" ON "tweets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tweets_twitter_id_key" ON "tweets"("twitter_id");
