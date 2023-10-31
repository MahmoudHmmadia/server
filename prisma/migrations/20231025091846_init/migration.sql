-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `calls_number` INTEGER NOT NULL,
    `plan` ENUM('FREE', 'PRO', 'PREMIUM') NOT NULL DEFAULT 'FREE',
    `refresh` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
