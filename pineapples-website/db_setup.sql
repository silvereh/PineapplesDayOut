-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 24, 2021 at 03:22 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pineapples_dev`
--
CREATE DATABASE IF NOT EXISTS `pineapples_dev` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pineapples_dev`;

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

DROP TABLE IF EXISTS `metadata`;
CREATE TABLE `metadata` (
  `ID` int(4) UNSIGNED NOT NULL,
  `TOKEN_ID` int(4) UNSIGNED DEFAULT NULL,
  `DESCRIPTION` varchar(2000) NOT NULL DEFAULT 'Pineapples Day Out is a collection of 5000 programmatically, randomly generated NFTs based on 109 different traits such as skins, crowns, accessories, and others, on the Ethereum blockchain.',
  `EXTERNAL_URL` varchar(255) NOT NULL DEFAULT 'https://pineapplesdayout.com',
  `IMAGE` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `BACKGROUND` varchar(64) NOT NULL DEFAULT 'None',
  `SKIN` varchar(64) NOT NULL DEFAULT 'None',
  `MOUTH` varchar(64) NOT NULL DEFAULT 'None',
  `EYES` varchar(64) NOT NULL DEFAULT 'None',
  `CROWN` varchar(64) NOT NULL DEFAULT 'None',
  `FOOTWEAR` varchar(64) NOT NULL DEFAULT 'None',
  `ACCESSORIES` varchar(64) NOT NULL DEFAULT 'None'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `metadata`
--
ALTER TABLE `metadata`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `metadata`
--
ALTER TABLE `metadata`
  MODIFY `ID` int(4) UNSIGNED NOT NULL AUTO_INCREMENT;
