/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Member_phone_number_key` ON `Member`(`phone_number`);
