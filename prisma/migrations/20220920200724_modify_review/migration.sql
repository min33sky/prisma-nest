/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ADD COLUMN     "content" VARCHAR(20) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
