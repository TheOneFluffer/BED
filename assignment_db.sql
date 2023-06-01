CREATE DATABASE  IF NOT EXISTS `game_server_assignment`;
USE `game_server_assignment`;
DROP TABLE IF EXISTS `users`, `review`, `category`, `game`, `platform`, `game_platform`;

use game_server_assignment;

# Creating tables below...
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `catname_UNIQUE` (`catname`)
);

CREATE TABLE `game` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` varchar(45) NOT NULL,
  `platformid` varchar(45) NOT NULL,
  `categoryid` varchar(45) NOT NULL,
  `year` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameid`)
);

CREATE TABLE `platform` (
  `platformid` int NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`platformid`),
  UNIQUE KEY `platform_name_UNIQUE` (`platform_name`)
);

CREATE TABLE `game_platform` (
  `game_platformid` int NOT NULL AUTO_INCREMENT,
  `fk_game` int NOT NULL,
  `fk_platform` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_platformid`),
  KEY `fk_game_idx` (`fk_game`),
  KEY `fk_platform_idx` (`fk_platform`),
  CONSTRAINT `fk_games` FOREIGN KEY (`fk_game`) REFERENCES `game` (`gameid`) ON DELETE CASCADE,
  CONSTRAINT `fk_platform` FOREIGN KEY (`fk_platform`) REFERENCES `platform` (`platformid`) ON DELETE CASCADE
);

CREATE TABLE `game_category` (
  `game_categoryid` int NOT NULL AUTO_INCREMENT,
  `fk_gamec` int NOT NULL,
  `fk_category` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_categoryid`),
  KEY `fk_gamec_idx` (`fk_gamec`),
  KEY `fk_category_idx` (`fk_category`),
  CONSTRAINT `fk_category` FOREIGN KEY (`fk_category`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE,
  CONSTRAINT `fk_gamec` FOREIGN KEY (`fk_gamec`) REFERENCES `game` (`gameid`) ON DELETE CASCADE
);

CREATE TABLE review (
  review_id int NOT NULL AUTO_INCREMENT,
  fk_user int NOT NULL,
  fk_rgame int NOT NULL,
  content varchar(1000) NOT NULL,
  rating int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (review_id),
  KEY fk_user_idx (fk_user),
  KEY fk_rgame_idx (fk_rgame),
  CONSTRAINT fk_rgame FOREIGN KEY (fk_rgame) REFERENCES game (gameid),
  CONSTRAINT fk_user FOREIGN KEY (fk_user) REFERENCES users (userid)
);

#Using this for debugging
#select * from foodMenu;