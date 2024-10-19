/*
  Warnings:

  - Added the required column `bar_code` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `bar_code` VARCHAR(56) NOT NULL;

-- CreateTable
CREATE TABLE `invoices_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(12, 8) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `pis_confins` DECIMAL(10, 2) NULL,
    `base_icms` DECIMAL(10, 2) NULL,
    `aliq_icms` DECIMAL(10, 2) NULL,
    `icms` DECIMAL(10, 2) NULL,
    `type_id` INTEGER NOT NULL,
    `invoice_id` INTEGER NOT NULL,
    `unit_measurement_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit_measurement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_item_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_unit_measurement_id_fkey` FOREIGN KEY (`unit_measurement_id`) REFERENCES `unit_measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `invoice_item_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
