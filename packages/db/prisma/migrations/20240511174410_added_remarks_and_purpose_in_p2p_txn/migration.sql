/*
  Warnings:

  - Added the required column `purpose` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('Utility', 'Bill_Sharing', 'Saving');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "purpose" "Purpose" NOT NULL,
ADD COLUMN     "remarks" TEXT NOT NULL;
