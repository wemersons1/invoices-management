-- CreateTable
CREATE TABLE `client_instalations` (
    `id` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,
    `sub_class_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_instalation_class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    UNIQUE INDEX `client_instalation_class_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_instalation_subclass` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    UNIQUE INDEX `client_instalation_subclass_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_instalation_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(255) NULL,
    `state` VARCHAR(25) NULL,
    `neighborhood` VARCHAR(255) NULL,
    `street` VARCHAR(255) NULL,
    `number` VARCHAR(4) NULL,
    `complement` VARCHAR(255) NULL,
    `clientInstalationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_instalations` ADD CONSTRAINT `client_instalations_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_instalations` ADD CONSTRAINT `client_instalations_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `client_instalation_class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_instalations` ADD CONSTRAINT `client_instalations_sub_class_id_fkey` FOREIGN KEY (`sub_class_id`) REFERENCES `client_instalation_subclass`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_instalation_address` ADD CONSTRAINT `client_instalation_address_clientInstalationId_fkey` FOREIGN KEY (`clientInstalationId`) REFERENCES `client_instalations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
