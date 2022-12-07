/*
  Warnings:

  - You are about to drop the `naughtyUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "naughtyUser";

-- CreateTable
CREATE TABLE "naughty_user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "isUnfollowed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "naughty_user_id_key" ON "naughty_user"("id");
