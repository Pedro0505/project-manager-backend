-- DropForeignKey
ALTER TABLE `workspace` DROP FOREIGN KEY `workspace_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `workspace_card` DROP FOREIGN KEY `workspace_card_column_id_fkey`;

-- DropForeignKey
ALTER TABLE `workspace_column` DROP FOREIGN KEY `workspace_column_workspace_id_fkey`;

-- AddForeignKey
ALTER TABLE `workspace` ADD CONSTRAINT `workspace_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_column` ADD CONSTRAINT `workspace_column_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_card` ADD CONSTRAINT `workspace_card_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `workspace_column`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
