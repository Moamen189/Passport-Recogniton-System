-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2021 at 03:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `passport_model`
--

CREATE TABLE `passport_model` (
  `id` int(11) NOT NULL,
  `Country` text NOT NULL,
  `Name` text NOT NULL,
  `Surname` text NOT NULL,
  `Sex` text NOT NULL,
  `DateOfBirth` int(11) NOT NULL,
  `Nationality` text NOT NULL,
  `ExpirationDate` int(11) NOT NULL,
  `Number` varchar(30) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0,
  `Problem` smallint(6) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `passport_model`
--

INSERT INTO `passport_model` (`id`, `Country`, `Name`, `Surname`, `Sex`, `DateOfBirth`, `Nationality`, `ExpirationDate`, `Number`, `Status`, `Problem`) VALUES
(82, 'GBR', 'Z', 'STSHELENASSPECIHENSSANGELASZOLS GG', 'F', 660911, 'GBK', 250351, '760641560', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `admin`) VALUES
(4, 'admin', 'sha256$KPXFebwChvG7jHdS$3bbe0f3b2af7c0a3611d91bf254c6052d49bbc3344c254e4a9a55595d2cf97b1', 1),
(6, 'ryies', 'sha256$bh5jb9ciHprwefJm$515aa6bd6f0bedd9d19c9bbe4d0d8df2528b7a6163abf09f073cc41575598e41', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `passport_model`
--
ALTER TABLE `passport_model`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Number` (`Number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `passport_model`
--
ALTER TABLE `passport_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
