/*
  Warnings:

  - A unique constraint covering the columns `[name,lastname]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_name_lastname_key" ON "user"("name", "lastname");
