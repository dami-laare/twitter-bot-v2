-- CreateTable
CREATE TABLE "naughtyUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "isUnfollowed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "naughtyUser_id_key" ON "naughtyUser"("id");
