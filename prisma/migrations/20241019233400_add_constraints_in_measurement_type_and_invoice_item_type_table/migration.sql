/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `invoice_item_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `measurement_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `invoice_item_type_name_key` ON `invoice_item_type`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `measurement_type_name_key` ON `measurement_type`(`name`);
