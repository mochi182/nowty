-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2023 at 11:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nowty`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividad`
--

CREATE TABLE `actividad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `imagen` varchar(2000) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `hecho` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `actividad_vs_configuracion`
--

CREATE TABLE `actividad_vs_configuracion` (
  `id_actividad` int(11) NOT NULL,
  `id_configuracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `por_fecha` int(11) DEFAULT NULL,
  `frecuencia_diaria` int(11) DEFAULT 1,
  `dia_inicial` int(11) DEFAULT NULL,
  `dia_final` int(11) DEFAULT NULL,
  `frecuencia_horaria` int(11) DEFAULT 1,
  `hora_inicial` double DEFAULT NULL,
  `hora_final` double DEFAULT NULL,
  `incluir_finde` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dia`
--

CREATE TABLE `dia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fecha`
--

CREATE TABLE `fecha` (
  `id` int(11) NOT NULL,
  `hora` int(11) DEFAULT NULL,
  `dia` int(11) DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `anho` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nota`
--

CREATE TABLE `nota` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `imagen` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nota_vs_configuracion`
--

CREATE TABLE `nota_vs_configuracion` (
  `id_nota` int(11) NOT NULL,
  `id_configuracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `metas` int(11) NOT NULL,
  `metas_alcanzadas` int(11) NOT NULL,
  `rutinas` int(11) NOT NULL,
  `rutinas_logradas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rutina`
--

CREATE TABLE `rutina` (
  `id` int(11) NOT NULL,
  `nombre` varchar(1000) DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `imagen` varchar(2000) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `hecho` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `actividad_vs_configuracion`
--
ALTER TABLE `actividad_vs_configuracion`
  ADD PRIMARY KEY (`id_actividad`,`id_configuracion`),
  ADD KEY `id_configuracion` (`id_configuracion`);

--
-- Indexes for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `por_fecha` (`por_fecha`),
  ADD KEY `dia_inicial` (`dia_inicial`),
  ADD KEY `dia_final` (`dia_final`);

--
-- Indexes for table `dia`
--
ALTER TABLE `dia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fecha`
--
ALTER TABLE `fecha`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nota_vs_configuracion`
--
ALTER TABLE `nota_vs_configuracion`
  ADD PRIMARY KEY (`id_nota`,`id_configuracion`),
  ADD KEY `id_configuracion` (`id_configuracion`);

--
-- Indexes for table `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dia`
--
ALTER TABLE `dia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fecha`
--
ALTER TABLE `fecha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nota`
--
ALTER TABLE `nota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rutina`
--
ALTER TABLE `rutina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividad_vs_configuracion`
--
ALTER TABLE `actividad_vs_configuracion`
  ADD CONSTRAINT `actividad_vs_configuracion_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`),
  ADD CONSTRAINT `actividad_vs_configuracion_ibfk_2` FOREIGN KEY (`id_configuracion`) REFERENCES `configuracion` (`id`);

--
-- Constraints for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `configuracion_ibfk_1` FOREIGN KEY (`por_fecha`) REFERENCES `fecha` (`id`),
  ADD CONSTRAINT `configuracion_ibfk_2` FOREIGN KEY (`dia_inicial`) REFERENCES `dia` (`id`),
  ADD CONSTRAINT `configuracion_ibfk_3` FOREIGN KEY (`dia_final`) REFERENCES `dia` (`id`);

--
-- Constraints for table `nota_vs_configuracion`
--
ALTER TABLE `nota_vs_configuracion`
  ADD CONSTRAINT `nota_vs_configuracion_ibfk_1` FOREIGN KEY (`id_nota`) REFERENCES `nota` (`id`),
  ADD CONSTRAINT `nota_vs_configuracion_ibfk_2` FOREIGN KEY (`id_configuracion`) REFERENCES `configuracion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
