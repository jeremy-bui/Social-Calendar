-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 01:37 AM
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
-- Database: `socialcalendar`
--

-- --------------------------------------------------------

--
-- Table structure for table `attending`
--

CREATE TABLE `attending` (
  `USER_ID` int(11) NOT NULL,
  `EVENT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attending`
--

INSERT INTO `attending` (`USER_ID`, `EVENT_ID`) VALUES
(1001, 9),
(1001, 10),
(1002, 8),
(1002, 9),
(1003, 1),
(1003, 2),
(1003, 3),
(1004, 8),
(1004, 9),
(1004, 10),
(1005, 2),
(1005, 3),
(1005, 7),
(1006, 1),
(1006, 2),
(1006, 4),
(1007, 7),
(1008, 1),
(1008, 4),
(1008, 5),
(1009, 6),
(1009, 8),
(1010, 2),
(1010, 3),
(1011, 2),
(1011, 3),
(1011, 9),
(1012, 1),
(1012, 2),
(1012, 5),
(1013, 1),
(1013, 3),
(1014, 5),
(1015, 4);

-- --------------------------------------------------------

--
-- Table structure for table `calendarevent`
--

CREATE TABLE `calendarevent` (
  `EVENT_ID` int(11) NOT NULL,
  `EVENT_DESC` varchar(255) DEFAULT NULL,
  `EVENT_DATE` varchar(255) DEFAULT NULL,
  `EVENT_NAME` varchar(25) DEFAULT NULL,
  `EVENT_LOCATION` varchar(255) DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calendarevent`
--

INSERT INTO `calendarevent` (`EVENT_ID`, `EVENT_DESC`, `EVENT_DATE`, `EVENT_NAME`, `EVENT_LOCATION`, `USER_ID`) VALUES
(1, 'dungeon and dragons social event with friends at MSC', '2023-05-25 18:00', 'D&D social', 'the msc', 1001),
(2, 'gaming boys get around to compete with each other', '2023-05-29 20:00', 'smashbro tournament', 'my house', 1002),
(3, 'This is a birthday party for David Edward!', '2023-05-18 19:00', 'birthday party', 'at my house', 1003),
(4, 'I am studying at Evans on this 5/4 Thursday. Come to study together!', '2023-05-04 15:00', 'studying at Evans', 'evans library', 1008),
(5, 'dinner at Chipotle to have a serious talk', '2023-05-21 18:00', 'dinner at Chipotle', 'chipotle', 1010),
(6, 'I am having a tennis match. Wanna come over??', '2023-05-15 14:30', 'tennis game', 'tennis courts', 1015),
(7, 'A casual movie watching event', '2023-05-25 18:00', 'netflix and chill', 'my apartment', 1006),
(8, 'making a web application with AI', '2023-06-10 12:30', 'hackathon', 'the msc', 1006),
(9, 'I gotta get rid of some cavity', '2023-05-12 18:00', 'dentistry', 'the dentist', 1004),
(10, 'If I do not get an A in this homework, I will fail', '2023-05-10 11:00', 'grinding homework', 'my apartment...', 1015);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `COMMENT_ID` int(11) NOT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `COMM_DESC` varchar(255) DEFAULT NULL,
  `COMM_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `EVENT_ID` int(11) DEFAULT NULL,
  `COMM_LIKE` int(11) DEFAULT NULL,
  `COMM_DISLIKE` int(11) DEFAULT NULL,
  `COMM_LOVE` int(11) DEFAULT NULL,
  `COMM_SAD` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`COMMENT_ID`, `USER_ID`, `COMM_DESC`, `COMM_DATE`, `EVENT_ID`, `COMM_LIKE`, `COMM_DISLIKE`, `COMM_LOVE`, `COMM_SAD`) VALUES
(11, 1002, 'Looking forward to this event!', '2023-05-26 00:00:30', 1, 0, 0, 0, 0),
(12, 1001, 'Yessir! We gaming tonight boys', '2023-05-30 01:10:00', 2, 1, 0, 1, 0),
(13, 1014, 'Happy Birthday David!', '2023-05-19 00:30:00', 3, 0, 1, 0, 0),
(14, 1005, 'I need to study too...', '2023-05-04 21:30:00', 4, 0, 2, 3, 0),
(15, 1003, 'At least there is Chipotle :)', '2023-05-21 23:15:00', 5, 1, 5, 3, 0),
(16, 1007, 'Sure! Singles or doubles?', '2023-05-15 19:45:00', 6, 1, 2, 0, 0),
(17, 1004, 'Which movie are we watching?', '2023-05-25 23:05:00', 7, 4, 7, 2, 3),
(18, 1009, 'Cool! What kind of app?', '2023-06-11 00:30:00', 8, 1, 1, 1, 1),
(19, 1010, 'Oh no! I hope it goes well!', '2023-05-13 00:30:00', 9, 1, 1, 1, 2),
(20, 1012, 'Bro... We should grind together', '2023-05-10 17:30:00', 10, 0, 0, 0, 1);

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

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`USER_ID`, `USER_NAME`, `PASSWORD`, `USER_TYPE`, `USER_FNAME`, `USER_LNAME`, `DATE_MADE`) VALUES
(1001, 'Johnny190', 'John9', 0, 'Johnny', 'Test', '2023-05-01 22:23:38'),
(1002, 'Sarah2000', 'IceSpice', 0, 'Sarah', 'Smith', '2023-05-01 22:23:43'),
(1003, 'DavidTheGOAT', 'Dedwards29', 0, 'David', 'Edwards', '2023-05-01 22:24:24'),
(1004, 'SelenaRox', 'GomezSelCumbia', 0, 'Selena', 'Gomez', '2023-05-01 22:24:24'),
(1005, 'PabloYZY', 'YeezyJumpedJumpman', 0, 'Pablo', 'Sanchez', '2023-05-01 22:24:24'),
(1006, 'Addie1274', 'papaJohns1950', 0, 'Addie', 'Rae', '2023-05-01 22:24:32'),
(1007, 'Jen200117', 'JenCade07', 0, 'Jenilee', 'Casiano', '2023-05-01 22:24:24'),
(1008, 'LanclosLLC', 'HogRider1985', 0, 'Christopher', 'Lanclos', '2023-05-01 22:24:24'),
(1009, 'JeremyPena', 'JemyPAllDay', 0, 'Jeremy', 'Pena', '2023-05-01 22:24:24'),
(1010, 'OVO6God', 'iLikeMilkAndCookies', 0, 'Aubrey', 'Graham', '2023-05-01 22:24:24'),
(1011, 'WeDidItJoe', 'SleepoverWithTheBoys', 0, 'Joe', 'Biden', '2023-04-30 20:26:07'),
(1012, 'RocketMan', 'FreeAsapRocky', 0, 'Donald', 'Trump', '2023-04-30 20:28:23'),
(1013, 'DogeStonks', 'iCanBuyYourFamTree', 0, 'Elon', 'Musk', '2023-04-30 20:28:23'),
(1014, 'HooperLakers', 'MJwishes', 0, 'Lebron', 'James', '2023-04-30 20:30:04'),
(1015, 'GOATBaller', 'LeMickey', 0, 'Michael', 'Jordan', '2023-04-30 20:30:04'),
(1016, 'PapaAdmin', 'LOLimAadmin', 1, 'Joe', 'Mama', '2023-05-01 22:25:43'),
(1017, 'JDawg', 'redskittles', 0, 'Jeremy ', 'Bui', '2023-05-03 23:36:56');

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

CREATE TABLE `reminder` (
  `REM_ID` int(11) NOT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `EVENT_ID` int(11) DEFAULT NULL,
  `REM_DESC` varchar(255) DEFAULT NULL,
  `REM_TITLE` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reminder`
--

INSERT INTO `reminder` (`REM_ID`, `USER_ID`, `EVENT_ID`, `REM_DESC`, `REM_TITLE`) VALUES
(1, 1011, 2, 'Show up, Bring my meds', 'Boys game night'),
(2, 1001, 10, 'Grind Time, lets get it', 'STUDY TIME'),
(3, 1002, 8, 'Steve Jobs Who', 'Web Grind'),
(4, 1003, 3, 'Wear clean clothes and shower', 'mi fiesta'),
(5, 1004, 9, 'Forget the pain, get it out', 'Dentist APPT'),
(6, 1005, 3, 'Get the drinks, girls, and clothes ready', 'Party SZN Approaching'),
(7, 1006, 4, 'Study hard for your upcoming PSYC Final', 'Evans now, PSYC test'),
(8, 1007, 7, 'Catch up on Gossip Girl', 'Netflix Zone'),
(9, 1008, 4, 'Gotta get into Tiny College, go ham', 'Study For Tiny College'),
(10, 1009, 6, 'Get someone OP for dubs and doubles', 'Tennis Session'),
(11, 1010, 3, 'Avoid everyone at the party, go straight to Ice Spice.', 'Ice Spice Time'),
(12, 1012, 2, 'Beat Biden on Rust, don\'t lose again', '1v1 again'),
(13, 1013, 1, 'Distract the boys with cybertruck vids to get more moves in', 'D&D sesh'),
(14, 1014, 5, 'Taco Tuesday without the Tues', 'Taco Taco Taco'),
(15, 1015, 4, 'Clutch up, don’t let lebron live rent free, free your mind and grind.', 'Start crying, Evans'),
(16, 1012, 5, 'Don’t bring billions, its only 10 dollars for a burrito', 'Burrito Time'),
(17, 1013, 3, 'Talk to the girls about my doge investments', 'Boolin Time');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendarevent`
--
ALTER TABLE `calendarevent`
  MODIFY `EVENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1018;

--
-- AUTO_INCREMENT for table `reminder`
--
ALTER TABLE `reminder`
  MODIFY `REM_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
