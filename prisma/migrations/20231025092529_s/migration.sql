/*
  Warnings:

  - You are about to drop the column `calls_number` on the `user` table. All the data in the column will be lost.
  - Added the required column `callsNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `calls_number`,
    ADD COLUMN `callsNumber` INTEGER NOT NULL;
