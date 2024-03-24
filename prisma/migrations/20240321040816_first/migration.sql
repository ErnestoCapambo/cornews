-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `User_id` INTEGER NOT NULL,

    UNIQUE INDEX `name_UNIQUE`(`name`),
    INDEX `fk_Category_User1_idx`(`User_id`),
    PRIMARY KEY (`id`, `User_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `file_path` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `accepted` TINYINT NULL DEFAULT 0,
    `User_id` INTEGER NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `views` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_File_User1_idx`(`User_id`),
    PRIMARY KEY (`id`, `User_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partnership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(150) NULL,
    `file_path` VARCHAR(200) NULL,
    `User_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_Partnership_User1_idx`(`User_id`),
    PRIMARY KEY (`id`, `User_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `contact` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_super` TINYINT NOT NULL DEFAULT 0,
    `is_active` TINYINT NULL DEFAULT 0,
    `is_admin` TINYINT NULL DEFAULT 0,
    `password` VARCHAR(50) NOT NULL,
    `is_blocked` TINYINT NULL DEFAULT 0,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `fk_Category_User1` FOREIGN KEY (`User_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `fk_File_User1` FOREIGN KEY (`User_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `partnership` ADD CONSTRAINT `fk_Partnership_User1` FOREIGN KEY (`User_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
