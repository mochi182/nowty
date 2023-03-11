-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2023 at 08:42 PM
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
  `hecho` tinyint(1) NOT NULL DEFAULT 0,
  `id_tipo_de_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actividad`
--

INSERT INTO `actividad` (`id`, `nombre`, `descripcion`, `imagen`, `hecho`, `id_tipo_de_actividad`) VALUES
(1, '', NULL, NULL, 0, 1),
(2, 'Activity 1', NULL, NULL, 0, 1),
(3, 'Activity 2', NULL, NULL, 0, 2),
(4, 'Activity 3', NULL, NULL, 0, 3),
(5, 'Activity 4', NULL, NULL, 0, 1),
(6, 'Activity 5', NULL, NULL, 0, 2),
(7, 'Activity 6', NULL, NULL, 0, 3),
(8, 'Activity 7', NULL, NULL, 0, 1),
(9, 'Regar las plantas', NULL, NULL, 0, 1),
(10, 'Mear', 'Por semana ejemplo.', NULL, 0, 2),
(11, 'prueba 2', 'prueba 2', NULL, 0, 2),
(12, 'prueba 3', 'prueba 3', NULL, 0, 1),
(13, 'prueba 4', 'prueba 4', NULL, 0, 1),
(14, 'prueba 5', 'prueba 5', NULL, 0, 2),
(15, 'prueba 6', 'prueba 6', NULL, 0, 2),
(16, 'prueba 7', 'prueba 7', NULL, 0, 2),
(17, 'prueba 8', 'prueba 8', 'comment.PNG', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `frecuencia_diaria` varchar(50) DEFAULT NULL,
  `frecuencia_horaria` varchar(50) DEFAULT NULL,
  `dia` int(11) DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `anho` int(11) DEFAULT NULL,
  `id_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `configuracion`
--

INSERT INTO `configuracion` (`id`, `frecuencia_diaria`, `frecuencia_horaria`, `dia`, `mes`, `anho`, `id_actividad`) VALUES
(1, NULL, NULL, 10, 3, 2023, 1),
(2, NULL, NULL, 10, 3, 2023, 2),
(3, NULL, NULL, 10, 3, 2023, 3),
(4, NULL, NULL, 10, 3, 2023, 4),
(5, NULL, NULL, 11, 3, 2023, 5),
(6, NULL, NULL, 11, 3, 2023, 6),
(7, NULL, NULL, 11, 3, 2023, 7),
(8, NULL, NULL, 12, 3, 2023, 8),
(9, NULL, NULL, 10, 3, 2023, 9),
(10, '0000100', '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]', NULL, NULL, NULL, 10),
(11, NULL, NULL, 10, 3, 2023, 11),
(12, NULL, NULL, 10, 3, 2023, 12),
(13, NULL, NULL, 10, 3, 2023, 13),
(14, '0000001', '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]', NULL, NULL, NULL, 14),
(15, '1000010', '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]', NULL, NULL, NULL, 15),
(16, '0001001', '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]', NULL, NULL, NULL, 16),
(17, '0000001', '111010101010101010100111', NULL, NULL, NULL, 17);

-- --------------------------------------------------------

--
-- Table structure for table `cronjob_log`
--

CREATE TABLE `cronjob_log` (
  `id` int(11) NOT NULL,
  `tiempo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cronjob_log`
--

INSERT INTO `cronjob_log` (`id`, `tiempo`) VALUES
(1, '2023-03-10'),
(2, '2023-03-11');

--
-- Triggers `cronjob_log`
--
DELIMITER $$
CREATE TRIGGER `reset_actividad_hecho` AFTER INSERT ON `cronjob_log` FOR EACH ROW BEGIN
  UPDATE actividad SET hecho = 0 WHERE id_tipo_de_actividad = 2;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `reset_registro_de_trabajo` BEFORE INSERT ON `cronjob_log` FOR EACH ROW BEGIN
  DECLARE row_count INT;
  SELECT COUNT(*) INTO row_count FROM cronjob_log;
  IF row_count >= 10 THEN
    DELETE FROM cronjob_log;
  END IF;
END
$$
DELIMITER ;

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
-- Table structure for table `tipo_de_actividad`
--

CREATE TABLE `tipo_de_actividad` (
  `id` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipo_de_actividad`
--

INSERT INTO `tipo_de_actividad` (`id`, `tipo`) VALUES
(1, 'puntual'),
(2, 'rutina'),
(3, 'nota'),
(4, 'puntual'),
(5, 'rutina'),
(6, 'nota'),
(7, 'puntual'),
(8, 'rutina'),
(9, 'nota'),
(10, 'puntual');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_de_actividad` (`id_tipo_de_actividad`);

--
-- Indexes for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_configuracion_actividad` (`id_actividad`);

--
-- Indexes for table `cronjob_log`
--
ALTER TABLE `cronjob_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_de_actividad`
--
ALTER TABLE `tipo_de_actividad`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad`
--
ALTER TABLE `actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cronjob_log`
--
ALTER TABLE `cronjob_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipo_de_actividad`
--
ALTER TABLE `tipo_de_actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `fk_tipo_de_actividad` FOREIGN KEY (`id_tipo_de_actividad`) REFERENCES `tipo_de_actividad` (`id`);

--
-- Constraints for table `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `fk_configuracion_actividad` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
