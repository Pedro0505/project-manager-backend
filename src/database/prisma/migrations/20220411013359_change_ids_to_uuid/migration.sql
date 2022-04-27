/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `users` table. All the data in the column will be lost.
  - The primary key for the `workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workspace_card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workspace_column` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `workspace` DROP FOREIGN KEY `workspace_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `workspace_card` DROP FOREIGN KEY `workspace_card_column_id_fkey`;

-- DropForeignKey
ALTER TABLE `workspace_column` DROP FOREIGN KEY `workspace_column_workspace_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `uuid`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workspace` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `owner_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workspace_card` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `column_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workspace_column` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `workspace_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `workspace` ADD CONSTRAINT `workspace_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_column` ADD CONSTRAINT `workspace_column_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_card` ADD CONSTRAINT `workspace_card_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `workspace_column`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
