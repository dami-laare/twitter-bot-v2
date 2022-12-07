-- CreateTable
CREATE TABLE "following" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "following_id_key" ON "following"("id");

-- CreateIndex
CREATE UNIQUE INDEX "followers_id_key" ON "followers"("id");
