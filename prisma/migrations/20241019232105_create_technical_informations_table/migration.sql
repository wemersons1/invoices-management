/*
  Warnings:

  - Added the required column `invoice_technical_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `invoice_technical_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `invoice_technical_information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurement` VARCHAR(16) NOT NULL,
    `previous_measurement` INTEGER NULL,
    `current_measurement` INTEGER NULL,
    `multiplication_constant` DECIMAL(10, 2) NULL,
    `consumption_in` DECIMAL(10, 3) NULL,
    `measurement_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `measurement_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_invoice_technical_id_fkey` FOREIGN KEY (`invoice_technical_id`) REFERENCES `invoice_technical_information`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_technical_information` ADD CONSTRAINT `invoice_technical_information_measurement_id_fkey` FOREIGN KEY (`measurement_id`) REFERENCES `measurement_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
