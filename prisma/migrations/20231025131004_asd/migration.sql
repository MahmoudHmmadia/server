/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Meet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Meet_code_key` ON `Meet`(`code`);
