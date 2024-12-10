/*
  Warnings:

  - You are about to drop the column `genre` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `installed` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Library` table. All the data in the column will be lost.
  - Changed the type of `price` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `gameId` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instaled` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "genre",
DROP COLUMN "img",
DROP COLUMN "installed",
DROP COLUMN "platform",
DROP COLUMN "price",
DROP COLUMN "rating",
DROP COLUMN "title",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "instaled" BOOLEAN NOT NULL;