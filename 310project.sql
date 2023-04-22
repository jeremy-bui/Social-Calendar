-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2023 at 10:44 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `310project`
--

-- --------------------------------------------------------

--
-- Table structure for table `attending`
--

CREATE TABLE `attending` (
  `USER_ID` int(11) NOT NULL,
  `EVENT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calendarevent`
--

CREATE TABLE `calendarevent` (
  `EVENT_ID` int(11) NOT NULL,
  `EVENT_DESC` varchar(255) DEFAULT NULL,
  `EVENT_DATE` timestamp NULL DEFAULT NULL,
  `EVENT_NAME` varchar(25) DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `COMMENT_ID` int(11) NOT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `COMM_DESC` varchar(255) DEFAULT NULL,
  `COMM_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `EVENT_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `USER_ID` int(11) NOT NULL,
  `USER_NAME` varchar(25) DEFAULT NULL,
  `PASSWORD` varchar(25) DEFAULT NULL,
  `USER_TYPE` int(11) DEFAULT NULL,
  `USER_FNAME` varchar(25) DEFAULT NULL,
  `USER_LNAME` varchar(25) DEFAULT NULL,
  `DATE_MADE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `REM_ID` int(11) NOT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `EVENT_ID` int(11) DEFAULT NULL,
  `REM_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `REM_DESC` varchar(255) DEFAULT NULL,
  `REM_TITLE` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attending`
--
ALTER TABLE `attending`
  ADD PRIMARY KEY (`USER_ID`,`EVENT_ID`),
  ADD KEY `EVENT_ID` (`EVENT_ID`);

--
-- Indexes for table `calendarevent`
--
ALTER TABLE `calendarevent`
  ADD PRIMARY KEY (`EVENT_ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`COMMENT_ID`),
  ADD KEY `USER_ID` (`USER_ID`),
  ADD KEY `EVENT_ID` (`EVENT_ID`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`USER_ID`);

--
-- Indexes for table `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`REM_ID`),
  ADD KEY `USER_ID` (`USER_ID`),
  ADD KEY `EVENT_ID` (`EVENT_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attending`
--
ALTER TABLE `attending`
  ADD CONSTRAINT `attending_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `person` (`USER_ID`),
  ADD CONSTRAINT `attending_ibfk_2` FOREIGN KEY (`EVENT_ID`) REFERENCES `calendarevent` (`EVENT_ID`);

--
-- Constraints for table `calendarevent`
--
ALTER TABLE `calendarevent`
  ADD CONSTRAINT `calendarevent_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `person` (`USER_ID`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `person` (`USER_ID`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`EVENT_ID`) REFERENCES `calendarevent` (`EVENT_ID`);

--
-- Constraints for table `reminder`
--
ALTER TABLE `reminder`
  ADD CONSTRAINT `reminder_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `person` (`USER_ID`),
  ADD CONSTRAINT `reminder_ibfk_2` FOREIGN KEY (`EVENT_ID`) REFERENCES `calendarevent` (`EVENT_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
