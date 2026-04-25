-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/04/2026 às 14:34
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `oficina`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf_cnpj` varchar(20) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `cpf_cnpj`, `telefone`, `email`, `endereco`, `data_cadastro`) VALUES
(3, 'alexsandewr', '1234234\'', '23423423423', '', '', '2026-04-07 01:43:33'),
(4, 'efgdf', 'gdfgdfg', 'fdgdfgdf', '', '', '2026-04-07 17:11:41'),
(5, 'vfvdfv', 'fdvfdv', '3455', '', '', '2026-04-07 17:14:01'),
(8, 'ALEXSANDER DAVI NAVES OLEGARIO', '324234', '35999503514', 'alexolegariog@gmail.com', '', '2026-04-12 23:00:16'),
(10, 'edgar fonseca', 'afdljfge1', '35999503514', 'alexolegariog@gmail.com', '', '2026-04-21 19:46:56'),
(11, 'Romeu zema', '1232556556', '35999503514', 'alexolegariog@gmail.com', '', '2026-04-21 20:19:21'),
(13, 'Romeu zema', '33434343', '35999503514', 'alexolegariog@gmail.com', '', '2026-04-21 20:19:41');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ordens_servico`
--

CREATE TABLE `ordens_servico` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `veiculo_id` int(11) NOT NULL,
  `descricao_problema` text DEFAULT NULL,
  `servico_realizado` text DEFAULT NULL,
  `valor_pecas` decimal(10,2) DEFAULT 0.00,
  `valor_mao_de_obra` decimal(10,2) DEFAULT 0.00,
  `valor_total` decimal(10,2) GENERATED ALWAYS AS (`valor_pecas` + `valor_mao_de_obra`) VIRTUAL,
  `status` enum('Aberta','Em Andamento','Finalizada','Cancelada') DEFAULT 'Aberta',
  `data_emissao` timestamp NOT NULL DEFAULT current_timestamp(),
  `mecanico_id` int(11) DEFAULT NULL,
  `observacoes_mecanico` text DEFAULT NULL,
  `servicos_executados` text DEFAULT NULL,
  `pecas_substituidas` text DEFAULT NULL,
  `data_saida` datetime DEFAULT NULL,
  `data_entrada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ordens_servico`
--

INSERT INTO `ordens_servico` (`id`, `cliente_id`, `veiculo_id`, `descricao_problema`, `servico_realizado`, `valor_pecas`, `valor_mao_de_obra`, `status`, `data_emissao`, `mecanico_id`, `observacoes_mecanico`, `servicos_executados`, `pecas_substituidas`, `data_saida`, `data_entrada`) VALUES
(10, 8, 8, 'problema  na bateria', NULL, 0.00, 250.00, 'Finalizada', '2026-04-12 23:02:22', 6, '', 'troca da bateria', '1 bateria ', '2026-04-12 20:03:55', '2026-04-12 20:02:22'),
(11, 3, 3, 'akjfkdsjkfdfdfd', NULL, 0.00, 0.00, '', '2026-04-21 19:26:10', 6, '', 'sdfsdsssfsds', '1, erefd', NULL, '2026-04-21 16:26:10'),
(12, 10, 9, 'cliente relatou que pneu esta com defeito', NULL, 0.00, 650.00, 'Finalizada', '2026-04-21 19:50:18', 8, '', 'foi trocado o cubo e rolamento do veiculo ', '1 cubo , 1 rolamento celta ', '2026-04-21 16:53:13', '2026-04-21 16:50:18'),
(13, 8, 8, 'rolamento solto', NULL, 0.00, 500.00, 'Finalizada', '2026-04-21 20:22:01', 8, '', 'foi trocado a roda dianteira essquerda...', '1 roda , 1 rolamento', '2026-04-21 17:25:22', '2026-04-21 17:22:01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('admin','mecanico') DEFAULT 'mecanico',
  `especialidade` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `usuario`, `senha`, `tipo`, `especialidade`, `status`) VALUES
(1, 'ADMINISTRADOR', 'admin', '123', 'admin', NULL, 'ativo'),
(6, 'jair', 'jairsons@gmail.com', '123', 'mecanico', 'Geral', 'ativo'),
(7, 'alexos\'', 'alexos@gmail.com', '123', 'mecanico', 'Geral', 'ativo'),
(8, 'denilson', 'denilson@ufla.br', '123', 'mecanico', 'Geral', 'ativo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `placa` varchar(10) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `ano` int(11) DEFAULT NULL,
  `cor` varchar(30) DEFAULT NULL,
  `km` int(11) DEFAULT NULL,
  `combustivel` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `veiculos`
--

INSERT INTO `veiculos` (`id`, `cliente_id`, `placa`, `marca`, `modelo`, `ano`, `cor`, `km`, `combustivel`) VALUES
(3, 3, 'ASF3456', 'sefsd', 'sdfsdf', 2334, '', 23243432, 'Flex'),
(4, 4, 'FRGDFDG', 'dfgfdg', 'fdgdfg', 2009, '', 34543534, 'Flex'),
(5, 5, 'DFVFDVF', 'vfdvfdvfd', 'monza', 2000, '', 23424, 'Flex'),
(8, 8, 'SADF343', 'asdf', 'sdfsd', 2009, 'azuk', 324234, 'Flex'),
(9, 10, 'SDFGSD', 'asdf', 'sdfsd', 2009, 'azuk', 324234, 'Flex'),
(11, 13, 'DEFSD', 'asdf', 'sdfsd', 2009, 'azuk', 324234, 'Etanol');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf_cnpj` (`cpf_cnpj`);

--
-- Índices de tabela `ordens_servico`
--
ALTER TABLE `ordens_servico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `veiculo_id` (`veiculo_id`),
  ADD KEY `fk_os_mecanico_rel` (`mecanico_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Índices de tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `ordens_servico`
--
ALTER TABLE `ordens_servico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de tabela `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `ordens_servico`
--
ALTER TABLE `ordens_servico`
  ADD CONSTRAINT `fk_mecanico_relacao` FOREIGN KEY (`mecanico_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_os_mecanico_rel` FOREIGN KEY (`mecanico_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `ordens_servico_ibfk_1` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
