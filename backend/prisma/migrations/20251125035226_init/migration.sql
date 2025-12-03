-- CreateTable
CREATE TABLE `ResetToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    INDEX `ResetToken_usuarioId_idx`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jogador` (
    `id_jogador` INTEGER NOT NULL AUTO_INCREMENT,
    `clash_id` VARCHAR(18) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `trofeus` INTEGER NOT NULL,
    `pais` VARCHAR(10) NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_cla` INTEGER NULL,

    UNIQUE INDEX `Jogador_clash_id_key`(`clash_id`),
    UNIQUE INDEX `Jogador_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`id_jogador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cla` (
    `id_cla` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `regiao` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_cla`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deck` (
    `id_deck` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `id_jogador` INTEGER NOT NULL,

    PRIMARY KEY (`id_deck`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carta` (
    `id_carta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `tipo` VARCHAR(30) NOT NULL,
    `raridade` VARCHAR(20) NOT NULL,
    `elixir` INTEGER NOT NULL,
    `nivel_maximo` INTEGER NOT NULL,
    `tipoCartaId` INTEGER NULL,

    PRIMARY KEY (`id_carta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deck_Carta` (
    `id_deck` INTEGER NOT NULL,
    `id_carta` INTEGER NOT NULL,
    `nivel_carta` INTEGER NOT NULL,

    PRIMARY KEY (`id_deck`, `id_carta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partida` (
    `id_partida` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resultado` VARCHAR(20) NOT NULL,
    `duracao` INTEGER NOT NULL,
    `id_jogador1` INTEGER NOT NULL,
    `id_jogador2` INTEGER NOT NULL,
    `id_arena` INTEGER NOT NULL,

    PRIMARY KEY (`id_partida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arena` (
    `id_arena` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `nivel_minimo` INTEGER NOT NULL,
    `trofeus_requeridos` INTEGER NOT NULL,

    PRIMARY KEY (`id_arena`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torneio` (
    `id_torneio` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `premiacao` VARCHAR(100) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_torneio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torneio_Jogador` (
    `id_torneio` INTEGER NOT NULL,
    `id_jogador` INTEGER NOT NULL,
    `colocacao` INTEGER NOT NULL,
    `pontuacao` INTEGER NOT NULL,

    PRIMARY KEY (`id_torneio`, `id_jogador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estatistica_Jogador` (
    `id_estatistica` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jogador` INTEGER NOT NULL,
    `vitorias` INTEGER NOT NULL,
    `derrotas` INTEGER NOT NULL,
    `empates` INTEGER NOT NULL,
    `taxa_vitoria` DOUBLE NOT NULL,

    UNIQUE INDEX `Estatistica_Jogador_id_jogador_key`(`id_jogador`),
    PRIMARY KEY (`id_estatistica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipo_Carta` (
    `id_tipo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_tipo` VARCHAR(30) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log_Acao` (
    `id_log` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jogador` INTEGER NOT NULL,
    `acao` VARCHAR(50) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `detalhes` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ResetToken` ADD CONSTRAINT `ResetToken_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jogador` ADD CONSTRAINT `Jogador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jogador` ADD CONSTRAINT `Jogador_id_cla_fkey` FOREIGN KEY (`id_cla`) REFERENCES `Cla`(`id_cla`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deck` ADD CONSTRAINT `Deck_id_jogador_fkey` FOREIGN KEY (`id_jogador`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carta` ADD CONSTRAINT `Carta_tipoCartaId_fkey` FOREIGN KEY (`tipoCartaId`) REFERENCES `Tipo_Carta`(`id_tipo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deck_Carta` ADD CONSTRAINT `Deck_Carta_id_deck_fkey` FOREIGN KEY (`id_deck`) REFERENCES `Deck`(`id_deck`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deck_Carta` ADD CONSTRAINT `Deck_Carta_id_carta_fkey` FOREIGN KEY (`id_carta`) REFERENCES `Carta`(`id_carta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_id_jogador1_fkey` FOREIGN KEY (`id_jogador1`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_id_jogador2_fkey` FOREIGN KEY (`id_jogador2`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_id_arena_fkey` FOREIGN KEY (`id_arena`) REFERENCES `Arena`(`id_arena`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio_Jogador` ADD CONSTRAINT `Torneio_Jogador_id_torneio_fkey` FOREIGN KEY (`id_torneio`) REFERENCES `Torneio`(`id_torneio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio_Jogador` ADD CONSTRAINT `Torneio_Jogador_id_jogador_fkey` FOREIGN KEY (`id_jogador`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estatistica_Jogador` ADD CONSTRAINT `Estatistica_Jogador_id_jogador_fkey` FOREIGN KEY (`id_jogador`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Acao` ADD CONSTRAINT `Log_Acao_id_jogador_fkey` FOREIGN KEY (`id_jogador`) REFERENCES `Jogador`(`id_jogador`) ON DELETE RESTRICT ON UPDATE CASCADE;
