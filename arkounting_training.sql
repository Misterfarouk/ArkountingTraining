-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2019 at 04:14 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arkounting_training`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `training_option` varchar(255) NOT NULL,
  `signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `username`, `email`, `training_option`, `signup_date`) VALUES
(1, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 11:55:52'),
(2, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 11:55:57'),
(3, 'farouk', 'faroukmuhammed84@gmail.com', 'Choose an option', '2019-05-16 12:07:09'),
(4, 'farouk', 'faroukmuhammed84@gmail.com', 'Choose an option', '2019-05-16 12:08:28'),
(5, 'farouk', 'faroukmuhammed84@gmail.com', 'Choose an option', '2019-05-16 12:09:43'),
(6, '', 'faroukmuhammed84@gmail.com', '1', '2019-05-16 12:12:12'),
(7, 'farouk', 'faroukmuhammed84@gmail.com', '3', '2019-05-16 14:41:59'),
(8, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 14:55:54'),
(9, 'farouk', 'faroukmuhammed84@gmail.com', '1', '2019-05-16 14:59:17'),
(10, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 14:59:51'),
(11, 'farouk muhammed', 'faroukmuhammed84@gmail.com', '3', '2019-05-16 15:02:49'),
(12, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 15:09:55'),
(13, 'farouk', 'faroukmuhammed84@gmail.com', '2', '2019-05-16 15:12:47'),
(14, 'arkounting', 'faroukmuhammed84@gmail.com', '2', '2019-05-17 08:23:44'),
(15, 'arkounting', 'faroukmuhammed84@gmail.com', '2', '2019-05-17 08:23:49'),
(16, 'demola', 'faroukmuhammed84@gmail.com', '2', '2019-05-17 08:33:07'),
(17, 'demola', 'faroukmuhammed84@gmail.com', '2', '2019-05-17 08:35:58');

-- --------------------------------------------------------

--
-- Table structure for table `training_options`
--

CREATE TABLE `training_options` (
  `training_id` int(11) NOT NULL,
  `training_name` varchar(255) NOT NULL,
  `default_price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `training_option` (`training_option`);

--
-- Indexes for table `training_options`
--
ALTER TABLE `training_options`
  ADD PRIMARY KEY (`training_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `training_options`
--
ALTER TABLE `training_options`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
