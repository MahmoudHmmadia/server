/*
  Warnings:

  - You are about to drop the column `meetId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_meetId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `meetId`;

-- CreateTable
CREATE TABLE `_MeetToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MeetToUser_AB_unique`(`A`, `B`),
    INDEX `_MeetToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MeetToUser` ADD CONSTRAINT `_MeetToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeetToUser` ADD CONSTRAINT `_MeetToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
