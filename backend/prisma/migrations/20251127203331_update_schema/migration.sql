-- DropForeignKey
ALTER TABLE `jogador` DROP FOREIGN KEY `Jogador_id_usuario_fkey`;

-- AddForeignKey
ALTER TABLE `Jogador` ADD CONSTRAINT `Jogador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
