/*
  Warnings:

  - You are about to drop the `_meettouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_meettouser` DROP FOREIGN KEY `_MeetToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_meettouser` DROP FOREIGN KEY `_MeetToUser_B_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `meetId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_meettouser`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
