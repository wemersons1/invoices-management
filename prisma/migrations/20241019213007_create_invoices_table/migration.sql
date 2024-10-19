/*
  Warnings:

  - You are about to drop the column `clientInstalationId` on the `client_instalation_address` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `client_instalation_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `client_instalation_subclass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `client_instalation_tariff_modality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `client_instalations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `document_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `client_instalation_address` DROP FOREIGN KEY `client_instalation_address_clientInstalationId_fkey`;

-- AlterTable
ALTER TABLE `client_instalation_address` DROP COLUMN `clientInstalationId`,
    ADD COLUMN `client_instalation_id` INTEGER NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `client_instalation_subclass` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `client_instalation_tariff_modality` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `client_instalations` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `document_types` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(5) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `number_of_days` INTEGER NOT NULL,
    `current_invoice` VARCHAR(5) NOT NULL,
    `next_invoice` VARCHAR(5) NOT NULL,
    `previous_invoice` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_instalation_address` ADD CONSTRAINT `client_instalation_address_client_instalation_id_fkey` FOREIGN KEY (`client_instalation_id`) REFERENCES `client_instalations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
