/*
  Warnings:

  - Added the required column `client_instalation_tariff_modality_id` to the `client_instalations` table without a default value. This is not possible if the table is not empty.
  - Made the column `sub_class_id` on table `client_instalations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `client_instalations` DROP FOREIGN KEY `client_instalations_sub_class_id_fkey`;

-- AlterTable
ALTER TABLE `client_instalations` ADD COLUMN `client_instalation_tariff_modality_id` INTEGER NOT NULL,
    MODIFY `sub_class_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `client_instalation_tariff_modality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    UNIQUE INDEX `client_instalation_tariff_modality_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_instalations` ADD CONSTRAINT `client_instalations_sub_class_id_fkey` FOREIGN KEY (`sub_class_id`) REFERENCES `client_instalation_subclass`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_instalations` ADD CONSTRAINT `client_instalations_client_instalation_tariff_modality_id_fkey` FOREIGN KEY (`client_instalation_tariff_modality_id`) REFERENCES `client_instalation_tariff_modality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
