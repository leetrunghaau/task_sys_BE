CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pass` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_user_FK` (`user_id`),
  CONSTRAINT `account_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `isscues.check_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `checked` tinyint(1) NOT NULL DEFAULT '0',
  `name` text NOT NULL,
  `isscues_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `isscues_check_list_issues_FK` (`isscues_id`),
  CONSTRAINT `isscues_check_list_issues_FK` FOREIGN KEY (`isscues_id`) REFERENCES `issues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `isscues.comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` text NOT NULL,
  `user_id` int NOT NULL,
  `parent` int DEFAULT NULL,
  `issuces_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `isscues_comment_isscues_comment_FK` (`parent`),
  KEY `isscues_comment_user_FK` (`user_id`),
  KEY `isscues_comment_issues_FK` (`issuces_id`),
  CONSTRAINT `isscues_comment_isscues_comment_FK` FOREIGN KEY (`parent`) REFERENCES `isscues.comment` (`id`),
  CONSTRAINT `isscues_comment_issues_FK` FOREIGN KEY (`issuces_id`) REFERENCES `issues` (`id`),
  CONSTRAINT `isscues_comment_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `issuces.priority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `issuces.status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `status_id` int DEFAULT NULL,
  `tracker_id` int NOT NULL,
  `priority_id` int NOT NULL,
  `assignee` int DEFAULT NULL,
  `created` datetime NOT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `progress` int NOT NULL DEFAULT '0',
  `parent` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issues_issues_FK` (`parent`),
  KEY `issues_project_FK` (`project_id`),
  KEY `issues_issues_tracker_FK` (`tracker_id`),
  KEY `issues_issuces_priority_FK` (`priority_id`),
  KEY `issues_issuces_status_FK` (`status_id`),
  KEY `issues_user_FK` (`assignee`),
  CONSTRAINT `issues_issuces_priority_FK` FOREIGN KEY (`priority_id`) REFERENCES `issuces.priority` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `issues_issuces_status_FK` FOREIGN KEY (`status_id`) REFERENCES `issuces.status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `issues_issues_FK` FOREIGN KEY (`parent`) REFERENCES `issues` (`id`),
  CONSTRAINT `issues_issues_tracker_FK` FOREIGN KEY (`tracker_id`) REFERENCES `issues.tracker` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `issues_project_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `issues_user_FK` FOREIGN KEY (`assignee`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `issues.note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `issues_id` int NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `issues_note_issues_FK` (`issues_id`),
  CONSTRAINT `issues_note_issues_FK` FOREIGN KEY (`issues_id`) REFERENCES `issues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `issues.tracker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `pemistion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pemistion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL COMMENT '1|2|3|4<>read|write|create|delete',
  `code` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text,
  `parent_id` int DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `project_project_FK` (`parent_id`),
  CONSTRAINT `project_project_FK` FOREIGN KEY (`parent_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `project.member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project.member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_member_project_FK` (`project_id`),
  KEY `project_member_user_FK` (`user_id`),
  CONSTRAINT `project_member_project_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_member_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `project.member_project.role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project.member_project.role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_member_project_role_project_member_FK` (`member_id`),
  KEY `project_member_project_role_project_role_FK` (`role_id`),
  CONSTRAINT `project_member_project_role_project_member_FK` FOREIGN KEY (`member_id`) REFERENCES `project.member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_member_project_role_project_role_FK` FOREIGN KEY (`role_id`) REFERENCES `project.role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `project.role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_role_project_FK` (`project_id`),
  CONSTRAINT `project_role_project_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `role_ppemistion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `pemistion_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_ppemistion_role_FK` (`role_id`),
  KEY `role_ppemistion_pemistion_FK` (`pemistion_id`),
  CONSTRAINT `role_ppemistion_pemistion_FK` FOREIGN KEY (`pemistion_id`) REFERENCES `pemistion` (`id`),
  CONSTRAINT `role_ppemistion_role_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_role_FK` (`user_id`),
  CONSTRAINT `user_role_role_FK` FOREIGN KEY (`user_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
