-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for naita-web-new
CREATE DATABASE IF NOT EXISTS `naita-web-new` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `naita-web-new`;

-- Dumping structure for table naita-web-new.aboutus_boardmember
CREATE TABLE IF NOT EXISTS `aboutus_boardmember` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `position` varchar(50) NOT NULL,
  `role` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) NOT NULL,
  `email` varchar(254) NOT NULL,
  `profile_pic` varchar(100) NOT NULL,
  `display_order` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `department_en` varchar(100) DEFAULT NULL,
  `department_si` varchar(100) DEFAULT NULL,
  `name_en` varchar(200) DEFAULT NULL,
  `name_si` varchar(200) DEFAULT NULL,
  `position_en` varchar(50) DEFAULT NULL,
  `position_si` varchar(50) DEFAULT NULL,
  `role_en` varchar(100) DEFAULT NULL,
  `role_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `aboutus_boardmember_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.aboutus_boardmember: ~0 rows (approximately)
REPLACE INTO `aboutus_boardmember` (`id`, `name`, `position`, `role`, `department`, `phone1`, `phone2`, `email`, `profile_pic`, `display_order`, `is_active`, `department_en`, `department_si`, `name_en`, `name_si`, `position_en`, `position_si`, `role_en`, `role_si`) VALUES
	(1, 'H A Saththar', 'management', 'Chairman', '', '011 286 6901', '', 'chairman@naita.gov.lk', 'board_members/H-A-saththar.png', 0, 1, NULL, NULL, 'H A Saththar', NULL, 'management', NULL, 'Chairman', NULL);

-- Dumping structure for table naita-web-new.aboutus_herocontent
CREATE TABLE IF NOT EXISTS `aboutus_herocontent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `background_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.aboutus_herocontent: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.aboutus_objective
CREATE TABLE IF NOT EXISTS `aboutus_objective` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `display_order` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `description_en` longtext,
  `description_si` longtext,
  PRIMARY KEY (`id`),
  CONSTRAINT `aboutus_objective_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.aboutus_objective: ~6 rows (approximately)
REPLACE INTO `aboutus_objective` (`id`, `description`, `display_order`, `is_active`, `description_en`, `description_si`) VALUES
	(2, 'Planning, organizing, and providing vocational training: NAITA designs and implements training programs across various sectors.', 0, 1, 'Planning, organizing, and providing vocational training: NAITA designs and implements training programs across various sectors.', ''),
	(3, 'Setting standards for vocational training: They establish benchmarks and guidelines for training quality.', 0, 1, 'Setting standards for vocational training: They establish benchmarks and guidelines for training quality.', ''),
	(4, 'Conducting examinations and issuing certifications: NAITA manages assessments and awards certificates for successful completion of training.', 0, 1, 'Conducting examinations and issuing certifications: NAITA manages assessments and awards certificates for successful completion of training.', ''),
	(5, 'Conducting National Trade Tests: They administer tests to evaluate practical skills in specific trades.', 0, 1, 'Conducting National Trade Tests: They administer tests to evaluate practical skills in specific trades.', ''),
	(6, 'Developing and delivering instructional materials: NAITA creates and provides resources for effective training delivery.', 0, 1, 'Developing and delivering instructional materials: NAITA creates and provides resources for effective training delivery.', ''),
	(7, 'Conducting research and development in vocational training: They explore new approaches and technologies in the field.', 0, 1, 'Conducting research and development in vocational training: They explore new approaches and technologies in the field.', '');

-- Dumping structure for table naita-web-new.aboutus_qualitypolicy
CREATE TABLE IF NOT EXISTS `aboutus_qualitypolicy` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `last_updated` datetime(6) NOT NULL,
  `content_en` longtext,
  `content_si` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.aboutus_qualitypolicy: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.auth_group
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.auth_group: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.auth_group_permissions
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.auth_group_permissions: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.auth_permission
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.auth_permission: ~120 rows (approximately)
REPLACE INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can view log entry', 1, 'view_logentry'),
	(5, 'Can add permission', 2, 'add_permission'),
	(6, 'Can change permission', 2, 'change_permission'),
	(7, 'Can delete permission', 2, 'delete_permission'),
	(8, 'Can view permission', 2, 'view_permission'),
	(9, 'Can add group', 3, 'add_group'),
	(10, 'Can change group', 3, 'change_group'),
	(11, 'Can delete group', 3, 'delete_group'),
	(12, 'Can view group', 3, 'view_group'),
	(13, 'Can add content type', 4, 'add_contenttype'),
	(14, 'Can change content type', 4, 'change_contenttype'),
	(15, 'Can delete content type', 4, 'delete_contenttype'),
	(16, 'Can view content type', 4, 'view_contenttype'),
	(17, 'Can add session', 5, 'add_session'),
	(18, 'Can change session', 5, 'change_session'),
	(19, 'Can delete session', 5, 'delete_session'),
	(20, 'Can view session', 5, 'view_session'),
	(21, 'Can add course category', 6, 'add_coursecategory'),
	(22, 'Can change course category', 6, 'change_coursecategory'),
	(23, 'Can delete course category', 6, 'delete_coursecategory'),
	(24, 'Can view course category', 6, 'view_coursecategory'),
	(25, 'Can add course', 7, 'add_course'),
	(26, 'Can change course', 7, 'change_course'),
	(27, 'Can delete course', 7, 'delete_course'),
	(28, 'Can view course', 7, 'view_course'),
	(29, 'Can add course offering', 8, 'add_courseoffering'),
	(30, 'Can change course offering', 8, 'change_courseoffering'),
	(31, 'Can delete course offering', 8, 'delete_courseoffering'),
	(32, 'Can view course offering', 8, 'view_courseoffering'),
	(33, 'Can add hero content', 9, 'add_herocontent'),
	(34, 'Can change hero content', 9, 'change_herocontent'),
	(35, 'Can delete hero content', 9, 'delete_herocontent'),
	(36, 'Can view hero content', 9, 'view_herocontent'),
	(37, 'Can add Dashboard Statistics', 10, 'add_dashboardstat'),
	(38, 'Can change Dashboard Statistics', 10, 'change_dashboardstat'),
	(39, 'Can delete Dashboard Statistics', 10, 'delete_dashboardstat'),
	(40, 'Can view Dashboard Statistics', 10, 'view_dashboardstat'),
	(41, 'Can add service', 11, 'add_service'),
	(42, 'Can change service', 11, 'change_service'),
	(43, 'Can delete service', 11, 'delete_service'),
	(44, 'Can view service', 11, 'view_service'),
	(45, 'Can add popular course', 12, 'add_popularcourse'),
	(46, 'Can change popular course', 12, 'change_popularcourse'),
	(47, 'Can delete popular course', 12, 'delete_popularcourse'),
	(48, 'Can view popular course', 12, 'view_popularcourse'),
	(49, 'Can add Module', 13, 'add_coursemodule'),
	(50, 'Can change Module', 13, 'change_coursemodule'),
	(51, 'Can delete Module', 13, 'delete_coursemodule'),
	(52, 'Can view Module', 13, 'view_coursemodule'),
	(53, 'Can add Topic', 14, 'add_coursetopic'),
	(54, 'Can change Topic', 14, 'change_coursetopic'),
	(55, 'Can delete Topic', 14, 'delete_coursetopic'),
	(56, 'Can view Topic', 14, 'view_coursetopic'),
	(57, 'Can add hero image', 15, 'add_heroimage'),
	(58, 'Can change hero image', 15, 'change_heroimage'),
	(59, 'Can delete hero image', 15, 'delete_heroimage'),
	(60, 'Can view hero image', 15, 'view_heroimage'),
	(61, 'Can add user', 16, 'add_user'),
	(62, 'Can change user', 16, 'change_user'),
	(63, 'Can delete user', 16, 'delete_user'),
	(64, 'Can view user', 16, 'view_user'),
	(65, 'Can add enrollment', 17, 'add_enrollment'),
	(66, 'Can change enrollment', 17, 'change_enrollment'),
	(67, 'Can delete enrollment', 17, 'delete_enrollment'),
	(68, 'Can view enrollment', 17, 'view_enrollment'),
	(69, 'Can add news category', 18, 'add_newscategory'),
	(70, 'Can change news category', 18, 'change_newscategory'),
	(71, 'Can delete news category', 18, 'delete_newscategory'),
	(72, 'Can view news category', 18, 'view_newscategory'),
	(73, 'Can add news post', 19, 'add_newspost'),
	(74, 'Can change news post', 19, 'change_newspost'),
	(75, 'Can delete news post', 19, 'delete_newspost'),
	(76, 'Can view news post', 19, 'view_newspost'),
	(77, 'Can add testimonial', 20, 'add_testimonial'),
	(78, 'Can change testimonial', 20, 'change_testimonial'),
	(79, 'Can delete testimonial', 20, 'delete_testimonial'),
	(80, 'Can view testimonial', 20, 'view_testimonial'),
	(81, 'Can add FAQ', 21, 'add_faq'),
	(82, 'Can change FAQ', 21, 'change_faq'),
	(83, 'Can delete FAQ', 21, 'delete_faq'),
	(84, 'Can view FAQ', 21, 'view_faq'),
	(85, 'Can add board member', 22, 'add_boardmember'),
	(86, 'Can change board member', 22, 'change_boardmember'),
	(87, 'Can delete board member', 22, 'delete_boardmember'),
	(88, 'Can view board member', 22, 'view_boardmember'),
	(89, 'Can add objective', 23, 'add_objective'),
	(90, 'Can change objective', 23, 'change_objective'),
	(91, 'Can delete objective', 23, 'delete_objective'),
	(92, 'Can view objective', 23, 'view_objective'),
	(93, 'Can add quality policy', 24, 'add_qualitypolicy'),
	(94, 'Can change quality policy', 24, 'change_qualitypolicy'),
	(95, 'Can delete quality policy', 24, 'delete_qualitypolicy'),
	(96, 'Can view quality policy', 24, 'view_qualitypolicy'),
	(97, 'Can add hero content', 25, 'add_herocontent'),
	(98, 'Can change hero content', 25, 'change_herocontent'),
	(99, 'Can delete hero content', 25, 'delete_herocontent'),
	(100, 'Can view hero content', 25, 'view_herocontent'),
	(101, 'Can add institution type', 26, 'add_institutiontype'),
	(102, 'Can change institution type', 26, 'change_institutiontype'),
	(103, 'Can delete institution type', 26, 'delete_institutiontype'),
	(104, 'Can view institution type', 26, 'view_institutiontype'),
	(105, 'Can add institution', 27, 'add_institution'),
	(106, 'Can change institution', 27, 'change_institution'),
	(107, 'Can delete institution', 27, 'delete_institution'),
	(108, 'Can view institution', 27, 'view_institution'),
	(109, 'Can add province', 28, 'add_province'),
	(110, 'Can change province', 28, 'change_province'),
	(111, 'Can delete province', 28, 'delete_province'),
	(112, 'Can view province', 28, 'view_province'),
	(113, 'Can add district', 29, 'add_district'),
	(114, 'Can change district', 29, 'change_district'),
	(115, 'Can delete district', 29, 'delete_district'),
	(116, 'Can view district', 29, 'view_district'),
	(117, 'Can add ds division', 30, 'add_dsdivision'),
	(118, 'Can change ds division', 30, 'change_dsdivision'),
	(119, 'Can delete ds division', 30, 'delete_dsdivision'),
	(120, 'Can view ds division', 30, 'view_dsdivision');

-- Dumping structure for table naita-web-new.courses_course
CREATE TABLE IF NOT EXISTS `courses_course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `code` varchar(20) NOT NULL,
  `description` longtext NOT NULL,
  `fee` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `requirements` json NOT NULL,
  `syllabus` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `background_image` varchar(100) DEFAULT NULL,
  `certification` varchar(100) NOT NULL,
  `features` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `registration_fee` decimal(10,2) NOT NULL,
  `is_free` tinyint(1) NOT NULL,
  `non_nvq_duration` int unsigned DEFAULT NULL,
  `non_nvq_duration_unit` varchar(10) DEFAULT NULL,
  `nvq3_duration` int unsigned DEFAULT NULL,
  `nvq3_duration_unit` varchar(10) DEFAULT NULL,
  `nvq4_duration` int unsigned DEFAULT NULL,
  `nvq4_duration_unit` varchar(10) DEFAULT NULL,
  `nvq_level` varchar(10) NOT NULL,
  `training_type` varchar(10) NOT NULL,
  `certification_en` varchar(100) DEFAULT NULL,
  `certification_si` varchar(100) DEFAULT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `features_en` json DEFAULT NULL,
  `features_si` json DEFAULT NULL,
  `requirements_en` json DEFAULT NULL,
  `requirements_si` json DEFAULT NULL,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `courses_course_category_id_d64b93bf_fk_courses_coursecategory_id` (`category_id`),
  CONSTRAINT `courses_course_category_id_d64b93bf_fk_courses_coursecategory_id` FOREIGN KEY (`category_id`) REFERENCES `courses_coursecategory` (`id`),
  CONSTRAINT `courses_course_chk_2` CHECK ((`non_nvq_duration` >= 0)),
  CONSTRAINT `courses_course_chk_3` CHECK ((`nvq3_duration` >= 0)),
  CONSTRAINT `courses_course_chk_4` CHECK ((`nvq4_duration` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_course: ~0 rows (approximately)
REPLACE INTO `courses_course` (`id`, `title`, `code`, `description`, `fee`, `is_active`, `thumbnail`, `requirements`, `syllabus`, `created_at`, `updated_at`, `category_id`, `background_image`, `certification`, `features`, `registration_fee`, `is_free`, `non_nvq_duration`, `non_nvq_duration_unit`, `nvq3_duration`, `nvq3_duration_unit`, `nvq4_duration`, `nvq4_duration_unit`, `nvq_level`, `training_type`, `certification_en`, `certification_si`, `description_en`, `description_si`, `features_en`, `features_si`, `requirements_en`, `requirements_si`, `title_en`, `title_si`) VALUES
	(1, 'Auto Electricals', 'AE', 'This course is designed to train individuals in diagnosing, repairing, and maintaining vehicles, with a special focus on mobile services. Students learn how to inspect engines, brakes, suspension systems, and electrical components. The course also covers the use of modern diagnostic tools and how to perform repairs at the customer’s location.\r\n\r\nBy the end of the course, trainees will be able to work as mobile automobile mechanics, providing on-site vehicle services such as breakdown repair, oil changes, battery replacements, and general servicing.', NULL, 1, 'course_thumbnails/istockphoto-1216317856-612x612.jpg', '["Grade 8 pass", "OL", "A/L", "13+", "School Leavers"]', 'course_syllabus/otg_Automobile_Mechanic.pdf', '2025-06-25 07:47:35.077168', '2025-06-25 07:47:35.077228', 1, 'course_backgrounds/images_1.jpeg', 'NVQ', '["diesel", "petrol"]', 1000.00, 1, NULL, NULL, 15, 'months', 30, 'months', 'both', 'both', 'NVQ', NULL, 'This course is designed to train individuals in diagnosing, repairing, and maintaining vehicles, with a special focus on mobile services. Students learn how to inspect engines, brakes, suspension systems, and electrical components. The course also covers the use of modern diagnostic tools and how to perform repairs at the customer’s location.\r\n\r\nBy the end of the course, trainees will be able to work as mobile automobile mechanics, providing on-site vehicle services such as breakdown repair, oil changes, battery replacements, and general servicing.', NULL, '["diesel", "petrol"]', '[]', '["Grade 8 pass", "OL", "A/L", "13+", "School Leavers"]', '[]', 'Auto Electricals', NULL),
	(2, 'Professional coockery', 'PC', 'professional cookery is most demanding course in worldwide. entering to this this course path open for', NULL, 1, 'course_thumbnails/professional_coockery.jpeg', '["OL", "AL", "13+", "AL Leavers"]', '', '2025-06-25 07:59:17.046209', '2025-06-25 07:59:17.046264', 2, 'course_backgrounds/professional_coockery_backgrond.jpg', 'NVQ', '["coockery"]', 1000.00, 1, NULL, NULL, 18, 'months', 30, 'months', 'both', 'both', 'NVQ', NULL, 'professional cookery is most demanding course in worldwide. entering to this this course path open for', NULL, '["coockery"]', '[]', '["OL", "AL", "13+", "AL Leavers"]', '[]', 'Professional coockery', NULL);

-- Dumping structure for table naita-web-new.courses_coursecategory
CREATE TABLE IF NOT EXISTS `courses_coursecategory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `icon` varchar(50) NOT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_coursecategory: ~0 rows (approximately)
REPLACE INTO `courses_coursecategory` (`id`, `name`, `description`, `icon`, `description_en`, `description_si`, `name_en`, `name_si`) VALUES
	(1, 'Automobile Meachanic', 'The Automobile Mechanic apprentice is an individual undergoing structured, hands-on training under the NAITA apprenticeship program to gain practical skills and theoretical knowledge in diagnosing, repairing, and maintaining motor vehicles.\r\n\r\nThis apprentice will work under the supervision of qualified instructors and industry professionals, learning about various automotive systems, engines, transmissions, brakes, and electrical components.', '', 'The Automobile Mechanic apprentice is an individual undergoing structured, hands-on training under the NAITA apprenticeship program to gain practical skills and theoretical knowledge in diagnosing, repairing, and maintaining motor vehicles.\r\n\r\nThis apprentice will work under the supervision of qualified instructors and industry professionals, learning about various automotive systems, engines, transmissions, brakes, and electrical components.', 'මෙම ශිෂ්‍යයා, NAITA විසින් දියත් කරන ලද පුහුණු වැඩසටහනක් යටතේ මෝටර් රථ නඩත්තු කිරීම, අලුත්වැඩියා කිරීම, සහ ගැටළු අනාවරණය කිරීම සම්බන්ධයෙන් වෘත්තියමය හා න්‍යායමය දැනුමක් ලබා ගැනීම සඳහා පුහුණු වේ.\r\n\r\nඔහු/ඇය සුදුසුකම් ලත් පුහුණුකරුවන් සහ කාර්මිකයන් යටතේ ක්‍රියාකාරීව පුහුණු වෙයි.', 'Automobile Meachanic', 'මෝටර් රථ යාන්ත්‍රික'),
	(2, 'Hospitality and Tourism', 'Variety of courses relating to hospitality and tourism sector offered by NAITA with NVQ 3 and 4.', '', 'Variety of courses relating to hospitality and tourism sector offered by NAITA with NVQ 3 and 4.', 'NAITA ආයතනය විසින් පිරිනමනු ලබන ආගන්තුක සත්කාර සහ සංචාරක ක්ෂේත්‍රයට අදාළ විවිධ පාඨමාලා NVQ 3 සහ 4 සමඟින්.', 'Hospitality and Tourism', 'ආගන්තුක සත්කාර සහ සංචාරක');

-- Dumping structure for table naita-web-new.courses_coursemodule
CREATE TABLE IF NOT EXISTS `courses_coursemodule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `order` int unsigned NOT NULL,
  `course_id` bigint NOT NULL,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_coursemodule_course_id_805095bb_fk_courses_course_id` (`course_id`),
  CONSTRAINT `courses_coursemodule_course_id_805095bb_fk_courses_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses_course` (`id`),
  CONSTRAINT `courses_coursemodule_chk_1` CHECK ((`order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_coursemodule: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.courses_courseoffering
CREATE TABLE IF NOT EXISTS `courses_courseoffering` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `schedule` varchar(200) NOT NULL,
  `available_seats` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `course_id` bigint NOT NULL,
  `instructor_id` bigint DEFAULT NULL,
  `institution_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courses_courseoffering_course_id_institution_id_c7b3956e_uniq` (`course_id`,`institution_id`,`start_date`,`schedule`),
  KEY `courses_courseoffering_instructor_id_1a8e9a89_fk_users_user_id` (`instructor_id`),
  KEY `courses_courseoffering_course_id_e8fae9f7` (`course_id`),
  KEY `courses_courseofferi_institution_id_e45aa308_fk_instituti` (`institution_id`),
  CONSTRAINT `courses_courseofferi_institution_id_e45aa308_fk_instituti` FOREIGN KEY (`institution_id`) REFERENCES `institutions_institution` (`id`),
  CONSTRAINT `courses_courseoffering_course_id_e8fae9f7_fk_courses_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses_course` (`id`),
  CONSTRAINT `courses_courseoffering_instructor_id_1a8e9a89_fk_users_user_id` FOREIGN KEY (`instructor_id`) REFERENCES `users_user` (`id`),
  CONSTRAINT `courses_courseoffering_chk_1` CHECK ((`available_seats` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_courseoffering: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.courses_coursetopic
CREATE TABLE IF NOT EXISTS `courses_coursetopic` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `order` int unsigned NOT NULL,
  `description` longtext NOT NULL,
  `module_id` bigint NOT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_coursetopic_module_id_d02ac63e_fk_courses_c` (`module_id`),
  CONSTRAINT `courses_coursetopic_module_id_d02ac63e_fk_courses_c` FOREIGN KEY (`module_id`) REFERENCES `courses_coursemodule` (`id`),
  CONSTRAINT `courses_coursetopic_chk_1` CHECK ((`order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_coursetopic: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.courses_course_available_districts
CREATE TABLE IF NOT EXISTS `courses_course_available_districts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint NOT NULL,
  `district_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courses_course_available_course_id_district_id_03c2dc96_uniq` (`course_id`,`district_id`),
  KEY `courses_course_avail_district_id_89c62c78_fk_locations` (`district_id`),
  CONSTRAINT `courses_course_avail_course_id_c7c741a4_fk_courses_c` FOREIGN KEY (`course_id`) REFERENCES `courses_course` (`id`),
  CONSTRAINT `courses_course_avail_district_id_89c62c78_fk_locations` FOREIGN KEY (`district_id`) REFERENCES `locations_district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_course_available_districts: ~0 rows (approximately)
REPLACE INTO `courses_course_available_districts` (`id`, `course_id`, `district_id`) VALUES
	(3, 1, 26),
	(4, 1, 27),
	(5, 1, 28),
	(6, 1, 29),
	(7, 1, 30),
	(8, 1, 31),
	(1, 1, 32),
	(2, 1, 33),
	(11, 2, 26),
	(12, 2, 27),
	(13, 2, 28),
	(14, 2, 29),
	(15, 2, 30),
	(16, 2, 31),
	(9, 2, 32),
	(10, 2, 33);

-- Dumping structure for table naita-web-new.courses_dashboardstat
CREATE TABLE IF NOT EXISTS `courses_dashboardstat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active_learners` int unsigned NOT NULL,
  `total_courses` int unsigned NOT NULL,
  `proud_graduates` int unsigned NOT NULL,
  `current_year` int unsigned NOT NULL,
  `last_updated` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `active_learners_en` int unsigned DEFAULT NULL,
  `active_learners_si` int unsigned DEFAULT NULL,
  `proud_graduates_en` int unsigned DEFAULT NULL,
  `proud_graduates_si` int unsigned DEFAULT NULL,
  `total_courses_en` int unsigned DEFAULT NULL,
  `total_courses_si` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `courses_dashboardstat_chk_1` CHECK ((`active_learners` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_10` CHECK ((`total_courses_si` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_2` CHECK ((`total_courses` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_3` CHECK ((`proud_graduates` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_4` CHECK ((`current_year` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_5` CHECK ((`active_learners_en` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_6` CHECK ((`active_learners_si` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_7` CHECK ((`proud_graduates_en` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_8` CHECK ((`proud_graduates_si` >= 0)),
  CONSTRAINT `courses_dashboardstat_chk_9` CHECK ((`total_courses_en` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_dashboardstat: ~0 rows (approximately)
REPLACE INTO `courses_dashboardstat` (`id`, `active_learners`, `total_courses`, `proud_graduates`, `current_year`, `last_updated`, `is_active`, `active_learners_en`, `active_learners_si`, `proud_graduates_en`, `proud_graduates_si`, `total_courses_en`, `total_courses_si`) VALUES
	(1, 6700, 180, 600000, 2025, '2025-06-25 08:17:40.386067', 1, 6700, 6700, 600000, 600000, 180, 180);

-- Dumping structure for table naita-web-new.courses_herocontent
CREATE TABLE IF NOT EXISTS `courses_herocontent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `button_text` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `button_text_en` varchar(50) DEFAULT NULL,
  `button_text_si` varchar(50) DEFAULT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_herocontent: ~0 rows (approximately)
REPLACE INTO `courses_herocontent` (`id`, `title`, `description`, `button_text`, `is_active`, `created_at`, `updated_at`, `button_text_en`, `button_text_si`, `description_en`, `description_si`, `title_en`, `title_si`) VALUES
	(1, 'Hero content', 'Hero content', 'Register Now', 1, '2025-06-23 03:43:05.056921', '2025-06-23 03:43:05.056959', 'Register Now', 'Register Now', 'Hero content', 'Hero content', 'Hero content', 'Hero content');

-- Dumping structure for table naita-web-new.courses_heroimage
CREATE TABLE IF NOT EXISTS `courses_heroimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `order` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `hero_content_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_heroimage_hero_content_id_d7355b15_fk_courses_h` (`hero_content_id`),
  CONSTRAINT `courses_heroimage_hero_content_id_d7355b15_fk_courses_h` FOREIGN KEY (`hero_content_id`) REFERENCES `courses_herocontent` (`id`),
  CONSTRAINT `courses_heroimage_chk_1` CHECK ((`order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_heroimage: ~4 rows (approximately)
REPLACE INTO `courses_heroimage` (`id`, `image`, `order`, `is_active`, `hero_content_id`) VALUES
	(1, 'hero_images/NAITA-Cover-new-4-1_ax9o3Y0.jpg', 0, 1, 1),
	(2, 'hero_images/daacc2f3-e300-4af2-b3ae-fa081212d3c8-1024x576_geN4OYf.jpeg', 0, 1, 1),
	(3, 'hero_images/NAITA-Cover-new-4-2_SQKgGqr.jpg', 0, 1, 1),
	(4, 'hero_images/NAITA-scaled_Lge8qw0.jpg', 0, 1, 1);

-- Dumping structure for table naita-web-new.courses_popularcourse
CREATE TABLE IF NOT EXISTS `courses_popularcourse` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `percentage` int unsigned NOT NULL,
  `year` int unsigned NOT NULL,
  `stats_id` bigint NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courses_popularcours_stats_id_e36a18cf_fk_courses_d` (`stats_id`),
  CONSTRAINT `courses_popularcours_stats_id_e36a18cf_fk_courses_d` FOREIGN KEY (`stats_id`) REFERENCES `courses_dashboardstat` (`id`),
  CONSTRAINT `courses_popularcourse_chk_1` CHECK ((`percentage` >= 0)),
  CONSTRAINT `courses_popularcourse_chk_2` CHECK ((`year` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_popularcourse: ~0 rows (approximately)
REPLACE INTO `courses_popularcourse` (`id`, `name`, `percentage`, `year`, `stats_id`, `name_en`, `name_si`) VALUES
	(1, 'Automobile Mechanic', 96, 2025, 1, 'Automobile Mechanic', 'මෝටර් රථ'),
	(2, 'Care Giver', 98, 2025, 1, 'Care Giver', 'සාත්තු සේවක'),
	(3, 'Professional Coockery', 85, 2025, 1, 'Professional Coockery', 'වෘත්තීය සුපවේදී'),
	(4, 'Pre School Teacher', 75, 2025, 1, 'Pre School Teacher', 'පෙර පාසල් ගුරුවරයා'),
	(5, 'ICT Technician', 90, 2025, 1, 'ICT Technician', 'ICT Technician');

-- Dumping structure for table naita-web-new.courses_service
CREATE TABLE IF NOT EXISTS `courses_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `icon_name` varchar(50) NOT NULL,
  `display_order` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `courses_service_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.courses_service: ~2 rows (approximately)
REPLACE INTO `courses_service` (`id`, `title`, `description`, `icon_name`, `display_order`, `is_active`, `description_en`, `description_si`, `title_en`, `title_si`) VALUES
	(1, 'Apprenticeship Training', 'This web application is designed to streamline and digitize the apprenticeship training management process of NAITA (National Apprentice and Industrial Training Authority). It serves as a centralized platform for managing apprentices, companies, training supervisors, and placement records.', '', 0, 1, 'This web application is designed to streamline and digitize the apprenticeship training management process of NAITA (National Apprentice and Industrial Training Authority). It serves as a centralized platform for managing apprentices, companies, training supervisors, and placement records.', 'මෙම වෙබ් යෙදුම ව්‍යාප්තව සහ ඩිජිටල් පදනමක් මත ආශ්‍රිතව ජාතික ශිෂ්‍ය භවිතා හා කාර්මික පුහුණු අධිකාරිය (NAITA) විසින් පවත්වාගෙන යනු ලබන Apprenticeship Training ක්‍රියාවලිය මනා ලෙස කළමනාකරණය කිරීම සඳහා නිර්මාණය කර ඇත. ශිෂ්‍යයන්, සමාගම්, පුහුණු උපදේශකයින්, සහ පිහිටුම් වාර්තා ආදිය එක්ම මධ්‍යස්ථ වේදිකාවකින් කළමනාකරණය කිරීම සඳහා මෙය උපකාරී වේ.', 'Apprenticeship Training', 'ආධුනිකත්ව පුහුණුව'),
	(2, 'On-the-Job Training (OJT) and Special Industrial Training (SIT) placement', 'This module is designed to manage and monitor the placement of apprentices into On-the-Job Training (OJT) and Special Industrial Training (SIT) programs. It ensures that students are placed in suitable companies or industries according to their trade, qualifications, and training requirements.', '', 0, 1, 'This module is designed to manage and monitor the placement of apprentices into On-the-Job Training (OJT) and Special Industrial Training (SIT) programs. It ensures that students are placed in suitable companies or industries according to their trade, qualifications, and training requirements.', 'මෙම මොඩියුලය ශ්‍රමීය පුහුණු (On-the-Job Training - OJT) සහ විශේෂ කාර්මික පුහුණු (Special Industrial Training - SIT) සදහා ශිෂ්‍යයන් සමාගම් වලට ස්ථානගත කිරීමේ ක්‍රියාවලිය කළමනාකරණය කිරීමට සහ නිරීක්ෂණය කිරීමට නිර්මාණය කර ඇත. ශිෂ්‍යයන්ගේ වෘත්තිය ක්ෂේත්‍රය, සුදුසුකම් සහ පුහුණු අවශ්‍යතා අනුව නියමිත සමාගමකට පිහිටුවීම මෙහි අරමුණ වේ.', 'On-the-Job Training (OJT) and Special Industrial Training (SIT) placement', 'ආධුනිකයින් සඳහා රැකියා ස්ථානයේ පුහුණුව (OJT) සහ විශේෂ කාර්මික පුහුණු (SIT) ස්ථානගත කිරීමේ සේවා සැපයීම.');

-- Dumping structure for table naita-web-new.django_admin_log
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.django_admin_log: ~18 rows (approximately)
REPLACE INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
	(1, '2025-06-23 03:43:05.492980', '1', 'Hero content', 1, '[{"added": {}}, {"added": {"name": "hero image", "object": "Image 0 for Hero content"}}, {"added": {"name": "hero image", "object": "Image 0 for Hero content"}}, {"added": {"name": "hero image", "object": "Image 0 for Hero content"}}, {"added": {"name": "hero image", "object": "Image 0 for Hero content"}}]', 9, 1),
	(2, '2025-06-23 03:46:20.633719', '1', 'Apprenticeship Training', 1, '[{"added": {}}]', 11, 1),
	(3, '2025-06-23 03:48:21.128462', '2', 'Provide On-the-Job Training (OJT) and Special Industrial Training (SIT) placement services for apprentices.', 1, '[{"added": {}}]', 11, 1),
	(4, '2025-06-23 03:50:08.986250', '2', 'Provide On-the-Job Training (OJT) and Special Industrial Training (SIT) placement services for apprentices.', 2, '[{"changed": {"fields": ["Description", "Description [en]", "Description [si]"]}}]', 11, 1),
	(5, '2025-06-23 03:50:54.990123', '2', 'Provide On-the-Job Training (OJT) and Special Industrial Training (SIT) placement services for apprentices.', 2, '[{"changed": {"fields": ["Description", "Description [en]", "Description [si]"]}}]', 11, 1),
	(6, '2025-06-23 03:51:49.183926', '2', 'On-the-Job Training (OJT) and Special Industrial Training (SIT) placement', 2, '[{"changed": {"fields": ["Title", "Title [en]"]}}]', 11, 1),
	(7, '2025-06-23 04:38:35.926998', '1', 'Automobile Meachanic', 1, '[{"added": {}}]', 6, 1),
	(8, '2025-06-24 10:52:20.580532', '1', 'H A Saththar - Top Management', 1, '[{"added": {}}]', 22, 1),
	(9, '2025-06-24 10:54:20.809015', '1', 'Objective 0: Key Objectives of NAITA:\r\nPlanning, organizing, an...', 1, '[{"added": {}}]', 23, 1),
	(10, '2025-06-24 10:54:59.570228', '1', 'Objective 0: Key Objectives of NAITA:\r\nPlanning, organizing, an...', 3, '', 23, 1),
	(11, '2025-06-24 10:55:13.970671', '2', 'Objective 0: Planning, organizing, and providing vocational tra...', 1, '[{"added": {}}]', 23, 1),
	(12, '2025-06-24 10:55:24.657530', '3', 'Objective 0: Setting standards for vocational training: They es...', 1, '[{"added": {}}]', 23, 1),
	(13, '2025-06-24 10:55:37.352399', '4', 'Objective 0: Conducting examinations and issuing certifications...', 1, '[{"added": {}}]', 23, 1),
	(14, '2025-06-24 10:55:48.408652', '5', 'Objective 0: Conducting National Trade Tests: They administer t...', 1, '[{"added": {}}]', 23, 1),
	(15, '2025-06-24 10:55:58.095921', '6', 'Objective 0: Developing and delivering instructional materials:...', 1, '[{"added": {}}]', 23, 1),
	(16, '2025-06-24 10:56:08.896983', '7', 'Objective 0: Conducting research and development in vocational ...', 1, '[{"added": {}}]', 23, 1),
	(17, '2025-06-24 10:58:04.683647', '1', 'District office badulla', 1, '[{"added": {}}]', 26, 1),
	(18, '2025-06-24 10:58:20.839637', '2', 'District office colombo', 1, '[{"added": {}}]', 26, 1),
	(19, '2025-06-24 10:58:34.714155', '3', 'District office Kandy', 1, '[{"added": {}}]', 26, 1),
	(20, '2025-06-24 10:58:51.406021', '4', 'District office Matale', 1, '[{"added": {}}]', 26, 1),
	(21, '2025-06-24 11:04:04.512233', '1', 'Institute of Engineering Technology (IET) (District Office)', 1, '[{"added": {}}]', 27, 1),
	(22, '2025-06-25 07:00:12.455123', '4', 'praneeth weerawardhana', 3, '', 16, 1),
	(23, '2025-06-25 07:00:12.455770', '2', 'sdssds sdsdsd', 3, '', 16, 1),
	(24, '2025-06-25 07:00:12.455871', '3', 'cvvvcv dfdfdf', 3, '', 16, 1),
	(25, '2025-06-25 07:06:52.041519', '10', 'Uva', 1, '[{"added": {}}]', 28, 1),
	(26, '2025-06-25 07:10:00.409488', '12', 'Western', 1, '[{"added": {}}]', 28, 1),
	(27, '2025-06-25 07:10:24.550348', '26', 'Colombo (Western)', 1, '[{"added": {}}]', 29, 1),
	(28, '2025-06-25 07:10:39.194840', '1', 'Kandy District ()', 3, '', 29, 1),
	(29, '2025-06-25 07:11:04.624007', '27', 'Gampaha (Western)', 1, '[{"added": {}}]', 29, 1),
	(30, '2025-06-25 07:11:29.825753', '28', 'Kalutara (Western)', 1, '[{"added": {}}]', 29, 1),
	(31, '2025-06-25 07:12:20.758208', '14', 'Central', 1, '[{"added": {}}]', 28, 1),
	(32, '2025-06-25 07:12:44.185654', '29', 'Kandy (Central)', 1, '[{"added": {}}]', 29, 1),
	(33, '2025-06-25 07:13:04.087776', '30', 'Matale (Central)', 1, '[{"added": {}}]', 29, 1),
	(34, '2025-06-25 07:13:32.799685', '31', 'Nuwara Eliya (Central)', 1, '[{"added": {}}]', 29, 1),
	(35, '2025-06-25 07:14:05.908740', '32', 'Badulla (Uva)', 1, '[{"added": {}}]', 29, 1),
	(36, '2025-06-25 07:14:32.647198', '33', 'Monaragala (Uva)', 1, '[{"added": {}}]', 29, 1),
	(37, '2025-06-25 07:35:24.292565', '2', 'Hospitality and Tourism', 1, '[{"added": {}}]', 6, 1),
	(38, '2025-06-25 07:47:36.037894', '1', 'AE - Auto Electricals', 1, '[{"added": {}}]', 7, 1),
	(39, '2025-06-25 07:59:17.054673', '2', 'PC - Professional coockery', 1, '[{"added": {}}]', 7, 1),
	(40, '2025-06-25 08:08:40.533994', '315', 'Mahiyanganaya (Badulla, Uva)', 1, '[{"added": {}}]', 30, 1),
	(41, '2025-06-25 08:09:12.292666', '316', 'Meegahakiula (Badulla, Uva)', 1, '[{"added": {}}]', 30, 1),
	(42, '2025-06-25 08:09:44.761688', '317', 'Rideemaliyadda (Badulla, Uva)', 1, '[{"added": {}}]', 30, 1),
	(43, '2025-06-25 08:15:23.520636', '1', 'Stats for 59', 1, '[{"added": {}}, {"added": {"name": "popular course", "object": "Automobile Mechanic (2025)"}}, {"added": {"name": "popular course", "object": "Care Giver (2025)"}}, {"added": {"name": "popular course", "object": "Professional Coockery (2025)"}}, {"added": {"name": "popular course", "object": "Pre School Teacher (2025)"}}]', 10, 1),
	(44, '2025-06-25 08:17:40.389485', '1', 'Stats for 2025', 2, '[{"changed": {"fields": ["Current year"]}}, {"added": {"name": "popular course", "object": "ICT Technician (2025)"}}]', 10, 1);

-- Dumping structure for table naita-web-new.django_content_type
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.django_content_type: ~30 rows (approximately)
REPLACE INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(22, 'aboutus', 'boardmember'),
	(25, 'aboutus', 'herocontent'),
	(23, 'aboutus', 'objective'),
	(24, 'aboutus', 'qualitypolicy'),
	(1, 'admin', 'logentry'),
	(3, 'auth', 'group'),
	(2, 'auth', 'permission'),
	(4, 'contenttypes', 'contenttype'),
	(7, 'courses', 'course'),
	(6, 'courses', 'coursecategory'),
	(13, 'courses', 'coursemodule'),
	(8, 'courses', 'courseoffering'),
	(14, 'courses', 'coursetopic'),
	(10, 'courses', 'dashboardstat'),
	(9, 'courses', 'herocontent'),
	(15, 'courses', 'heroimage'),
	(12, 'courses', 'popularcourse'),
	(11, 'courses', 'service'),
	(17, 'enrollments', 'enrollment'),
	(21, 'faqs', 'faq'),
	(27, 'institutions', 'institution'),
	(26, 'institutions', 'institutiontype'),
	(29, 'locations', 'district'),
	(30, 'locations', 'dsdivision'),
	(28, 'locations', 'province'),
	(18, 'news', 'newscategory'),
	(19, 'news', 'newspost'),
	(5, 'sessions', 'session'),
	(20, 'testimonials', 'testimonial'),
	(16, 'users', 'user');

-- Dumping structure for table naita-web-new.django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.django_migrations: ~54 rows (approximately)
REPLACE INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'aboutus', '0001_initial', '2025-06-22 16:01:47.607056'),
	(2, 'aboutus', '0002_objective_qualitypolicy', '2025-06-22 16:01:49.471212'),
	(3, 'aboutus', '0003_boardmember_department_en_boardmember_department_si_and_more', '2025-06-22 16:01:55.038288'),
	(4, 'aboutus', '0004_herocontent', '2025-06-22 16:01:55.715467'),
	(5, 'contenttypes', '0001_initial', '2025-06-22 16:01:56.998194'),
	(6, 'contenttypes', '0002_remove_content_type_name', '2025-06-22 16:01:58.849972'),
	(7, 'auth', '0001_initial', '2025-06-22 16:02:09.786596'),
	(8, 'auth', '0002_alter_permission_name_max_length', '2025-06-22 16:02:12.176128'),
	(9, 'auth', '0003_alter_user_email_max_length', '2025-06-22 16:02:12.303202'),
	(10, 'auth', '0004_alter_user_username_opts', '2025-06-22 16:02:12.436067'),
	(11, 'auth', '0005_alter_user_last_login_null', '2025-06-22 16:02:12.568846'),
	(12, 'auth', '0006_require_contenttypes_0002', '2025-06-22 16:02:12.716704'),
	(13, 'auth', '0007_alter_validators_add_error_messages', '2025-06-22 16:02:12.854764'),
	(14, 'auth', '0008_alter_user_username_max_length', '2025-06-22 16:02:13.034229'),
	(15, 'auth', '0009_alter_user_last_name_max_length', '2025-06-22 16:02:13.260871'),
	(16, 'auth', '0010_alter_group_name_max_length', '2025-06-22 16:02:13.901060'),
	(17, 'auth', '0011_update_proxy_permissions', '2025-06-22 16:02:13.979464'),
	(18, 'auth', '0012_alter_user_first_name_max_length', '2025-06-22 16:02:14.128452'),
	(19, 'users', '0001_initial', '2025-06-22 16:02:28.911715'),
	(20, 'admin', '0001_initial', '2025-06-22 16:02:36.626178'),
	(21, 'admin', '0002_logentry_remove_auto_add', '2025-06-22 16:02:36.833079'),
	(22, 'admin', '0003_logentry_add_action_flag_choices', '2025-06-22 16:02:37.032290'),
	(23, 'locations', '0001_initial', '2025-06-22 16:02:46.585917'),
	(24, 'locations', '0002_load_initial_locations', '2025-06-22 16:02:47.325679'),
	(25, 'locations', '0003_load_initial_locations', '2025-06-22 16:02:47.530219'),
	(26, 'institutions', '0001_initial', '2025-06-22 16:02:52.368678'),
	(27, 'institutions', '0002_institution_district_institution_ds_division', '2025-06-22 16:02:58.242016'),
	(28, 'courses', '0001_initial', '2025-06-22 16:03:10.499941'),
	(29, 'courses', '0002_initial', '2025-06-22 16:03:16.266394'),
	(30, 'courses', '0003_course_background_image_course_certification_and_more', '2025-06-22 16:03:28.189961'),
	(31, 'courses', '0004_herocontent', '2025-06-22 16:03:28.831628'),
	(32, 'courses', '0005_dashboardstat_service_popularcourse', '2025-06-22 16:03:33.928015'),
	(33, 'courses', '0006_alter_courseoffering_unique_together_and_more', '2025-06-22 16:03:53.437701'),
	(34, 'courses', '0007_migrate_training_centers', '2025-06-22 16:03:53.676696'),
	(35, 'courses', '0008_remove_courseoffering_center_and_more', '2025-06-22 16:04:05.599861'),
	(36, 'courses', '0009_migrate_existing_courses', '2025-06-22 16:04:05.811189'),
	(37, 'courses', '0010_remove_course_content_remove_course_duration_and_more', '2025-06-22 16:04:36.545778'),
	(38, 'courses', '0011_remove_course_duration_remove_course_duration_unit_and_more', '2025-06-22 16:05:09.479514'),
	(39, 'courses', '0012_remove_herocontent_background_image_heroimage', '2025-06-22 16:05:13.349405'),
	(40, 'enrollments', '0001_initial', '2025-06-22 16:05:17.030112'),
	(41, 'enrollments', '0002_initial', '2025-06-22 16:05:19.751783'),
	(42, 'enrollments', '0003_enrollment_district_enrollment_rejection_reason', '2025-06-22 16:05:23.200909'),
	(43, 'faqs', '0001_initial', '2025-06-22 16:05:23.834866'),
	(44, 'faqs', '0002_faq_answer_en_faq_answer_si_faq_category_en_and_more', '2025-06-22 16:05:26.779355'),
	(45, 'institutions', '0003_institution_address_en_institution_address_si_and_more', '2025-06-22 16:05:27.026541'),
	(46, 'institutions', '0004_institution_description', '2025-06-22 16:05:27.994326'),
	(47, 'institutions', '0005_institution_address_en_institution_address_si_and_more', '2025-06-22 16:05:28.393702'),
	(48, 'institutions', '0006_institution_address_en_institution_address_si_and_more', '2025-06-22 16:05:37.425691'),
	(49, 'locations', '0004_district_name_en_district_name_si_dsdivision_name_en_and_more', '2025-06-22 16:05:46.599385'),
	(50, 'news', '0001_initial', '2025-06-22 16:05:53.705585'),
	(51, 'news', '0002_newspost_views', '2025-06-22 16:05:57.938982'),
	(52, 'news', '0003_newscategory_name_en_newscategory_name_si_and_more', '2025-06-22 16:05:58.759657'),
	(53, 'news', '0004_newscategory_name_en_newscategory_name_si_and_more', '2025-06-22 16:05:58.896024'),
	(54, 'news', '0005_newscategory_name_en_newscategory_name_si_and_more', '2025-06-22 16:05:59.027790'),
	(55, 'news', '0006_newscategory_name_en_newscategory_name_si_and_more', '2025-06-22 16:05:59.184483'),
	(56, 'news', '0007_newscategory_name_en_newscategory_name_si_and_more', '2025-06-22 16:06:04.135955'),
	(57, 'sessions', '0001_initial', '2025-06-22 16:06:05.959873'),
	(58, 'testimonials', '0001_initial', '2025-06-22 16:06:09.217864'),
	(59, 'users', '0002_user_date_of_birth_user_district_and_more', '2025-06-22 16:06:17.705323'),
	(60, 'users', '0003_user_is_verified', '2025-06-22 16:06:18.819032'),
	(61, 'users', '0004_alter_user_district', '2025-06-22 16:06:26.203869'),
	(62, 'users', '0005_alter_user_user_type', '2025-06-22 16:06:26.366331');

-- Dumping structure for table naita-web-new.django_session
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.django_session: ~2 rows (approximately)
REPLACE INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
	('8m0n045yyengbw4mxcth0xqs9xj847pm', '.eJxVjEEOwiAQRe_C2pAChaEu3XuGZmBmpGpoUtqV8e7apAvd_vfef6kRt7WMW-NlnEidlVen3y1hfnDdAd2x3mad57ouU9K7og_a9HUmfl4O9--gYCvfOkUECcmSA9tHCkzi3CAsrg_C3gDYDLFjdBnEDl0PIUo23qCHjtmq9wfzbzfu:1uUTHj:10g0HNevodG-HmnCI2PpFCa36JvBEE0JrZYTFFO4FsU', '2025-07-09 16:47:43.811936'),
	('cfkwkkrdalygt3wvz5kkbj7uuiftcn05', '.eJxVjEEOwiAQRe_C2hCgZWRcuu8ZCAyMVA0kpV0Z765NutDtf-_9l_BhW4vfel78nMRFaHH63WKgR647SPdQb01Sq-syR7kr8qBdTi3l5_Vw_w5K6OVbI1iknIAZwCgeHTpjFVnFmrQzo86GjTOZUI0MZAeLEDmhOpPCAaJ4fwDLYzcu:1uTY3K:EDj29axNxyQQbDurc3yvNPrQyILo14r3s4n2C_p0vKE', '2025-07-07 03:41:02.023910');

-- Dumping structure for table naita-web-new.enrollments_enrollment
CREATE TABLE IF NOT EXISTS `enrollments_enrollment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `applied_date` datetime(6) NOT NULL,
  `status` varchar(20) NOT NULL,
  `comments` longtext NOT NULL,
  `offering_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `district_id` bigint DEFAULT NULL,
  `rejection_reason` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enrollments_enrollme_offering_id_7f73056b_fk_courses_c` (`offering_id`),
  KEY `enrollments_enrollment_student_id_92696b89_fk_users_user_id` (`student_id`),
  KEY `enrollments_enrollme_district_id_9bf668bd_fk_locations` (`district_id`),
  CONSTRAINT `enrollments_enrollme_district_id_9bf668bd_fk_locations` FOREIGN KEY (`district_id`) REFERENCES `locations_district` (`id`),
  CONSTRAINT `enrollments_enrollme_offering_id_7f73056b_fk_courses_c` FOREIGN KEY (`offering_id`) REFERENCES `courses_courseoffering` (`id`),
  CONSTRAINT `enrollments_enrollment_student_id_92696b89_fk_users_user_id` FOREIGN KEY (`student_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.enrollments_enrollment: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.faqs_faq
CREATE TABLE IF NOT EXISTS `faqs_faq` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` longtext NOT NULL,
  `category` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `display_order` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `answer_en` longtext,
  `answer_si` longtext,
  `category_en` varchar(50) DEFAULT NULL,
  `category_si` varchar(50) DEFAULT NULL,
  `question_en` varchar(255) DEFAULT NULL,
  `question_si` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `faqs_faq_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.faqs_faq: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.institutions_institution
CREATE TABLE IF NOT EXISTS `institutions_institution` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` varchar(10) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` longtext NOT NULL,
  `email` varchar(254) NOT NULL,
  `website` varchar(200) NOT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) NOT NULL,
  `google_map_link` varchar(500) NOT NULL,
  `head_name` varchar(100) NOT NULL,
  `head_position` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `display_order` int unsigned NOT NULL,
  `institution_type_id` bigint DEFAULT NULL,
  `district_id` bigint DEFAULT NULL,
  `ds_division_id` bigint DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `address_en` longtext,
  `address_si` longtext,
  `city_en` varchar(100) DEFAULT NULL,
  `city_si` varchar(100) DEFAULT NULL,
  `description_en` varchar(500) DEFAULT NULL,
  `description_si` varchar(500) DEFAULT NULL,
  `head_name_en` varchar(100) DEFAULT NULL,
  `head_name_si` varchar(100) DEFAULT NULL,
  `head_position_en` varchar(100) DEFAULT NULL,
  `head_position_si` varchar(100) DEFAULT NULL,
  `name_en` varchar(200) DEFAULT NULL,
  `name_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `institutions_institu_institution_type_id_d0bba513_fk_instituti` (`institution_type_id`),
  KEY `institutions_institu_district_id_08cef8a1_fk_locations` (`district_id`),
  KEY `institutions_institu_ds_division_id_7186326c_fk_locations` (`ds_division_id`),
  CONSTRAINT `institutions_institu_district_id_08cef8a1_fk_locations` FOREIGN KEY (`district_id`) REFERENCES `locations_district` (`id`),
  CONSTRAINT `institutions_institu_ds_division_id_7186326c_fk_locations` FOREIGN KEY (`ds_division_id`) REFERENCES `locations_dsdivision` (`id`),
  CONSTRAINT `institutions_institu_institution_type_id_d0bba513_fk_instituti` FOREIGN KEY (`institution_type_id`) REFERENCES `institutions_institutiontype` (`id`),
  CONSTRAINT `institutions_institution_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.institutions_institution: ~0 rows (approximately)
REPLACE INTO `institutions_institution` (`id`, `name`, `type`, `city`, `address`, `email`, `website`, `phone1`, `phone2`, `google_map_link`, `head_name`, `head_position`, `image`, `is_active`, `display_order`, `institution_type_id`, `district_id`, `ds_division_id`, `description`, `address_en`, `address_si`, `city_en`, `city_si`, `description_en`, `description_si`, `head_name_en`, `head_name_si`, `head_position_en`, `head_position_si`, `name_en`, `name_si`) VALUES
	(1, 'Institute of Engineering Technology (IET)', 'DISTRICT', 'colombo', 'colombo 5', 'student1@gmial.com', '', '0717777777', '', 'https://maps.app.goo.gl/QoFmxnE8HY7UR2kG8', 'NAITA', 'Principal', 'institutions/images.jpeg', 1, 0, 2, 13, NULL, '', 'colombo 5', '', 'colombo', NULL, NULL, NULL, 'NAITA', NULL, 'Principal', NULL, 'Institute of Engineering Technology (IET)', NULL);

-- Dumping structure for table naita-web-new.institutions_institutiontype
CREATE TABLE IF NOT EXISTS `institutions_institutiontype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `description_en` longtext,
  `description_si` longtext,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.institutions_institutiontype: ~4 rows (approximately)
REPLACE INTO `institutions_institutiontype` (`id`, `name`, `description`, `description_en`, `description_si`, `name_en`, `name_si`) VALUES
	(1, 'District office badulla', '', '', '', 'District office badulla', NULL),
	(2, 'District office colombo', '', '', '', 'District office colombo', NULL),
	(3, 'District office Kandy', '', '', '', 'District office Kandy', NULL),
	(4, 'District office Matale', '', '', '', 'District office Matale', NULL);

-- Dumping structure for table naita-web-new.locations_district
CREATE TABLE IF NOT EXISTS `locations_district` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `province_id` bigint NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `locations_district_name_province_id_857bc6fc_uniq` (`name`,`province_id`),
  KEY `locations_district_province_id_211d6f10_fk_locations_province_id` (`province_id`),
  CONSTRAINT `locations_district_province_id_211d6f10_fk_locations_province_id` FOREIGN KEY (`province_id`) REFERENCES `locations_province` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.locations_district: ~25 rows (approximately)
REPLACE INTO `locations_district` (`id`, `name`, `is_active`, `province_id`, `name_en`, `name_si`) VALUES
	(2, 'Matale District', 1, 1, NULL, NULL),
	(3, 'Nuwara Eliya District', 1, 1, NULL, NULL),
	(4, 'Ampara District', 1, 2, NULL, NULL),
	(5, 'Batticaloa District', 1, 2, NULL, NULL),
	(6, 'Trincomalee District', 1, 2, NULL, NULL),
	(7, 'Jaffna District', 1, 3, NULL, NULL),
	(8, 'Kilinochchi District', 1, 3, NULL, NULL),
	(9, 'Mannar District', 1, 3, NULL, NULL),
	(10, 'Mullaitivu District', 1, 3, NULL, NULL),
	(11, 'Vavuniya District', 1, 3, NULL, NULL),
	(12, 'Anuradhapura District', 1, 4, NULL, NULL),
	(13, 'Polonnaruwa District', 1, 4, NULL, NULL),
	(14, 'Kurunegala District', 1, 5, NULL, NULL),
	(15, 'Puttalam District', 1, 5, NULL, NULL),
	(16, 'Kegalle District', 1, 6, NULL, NULL),
	(17, 'Ratnapura District', 1, 6, NULL, NULL),
	(18, 'Galle District', 1, 7, NULL, NULL),
	(19, 'Hambantota District', 1, 7, NULL, NULL),
	(20, 'Matara District', 1, 7, NULL, NULL),
	(21, 'Badulla District', 1, 8, NULL, NULL),
	(22, 'Monaragala District', 1, 8, NULL, NULL),
	(23, 'Colombo District', 1, 9, NULL, NULL),
	(24, 'Gampaha District', 1, 9, NULL, NULL),
	(25, 'Kalutara District', 1, 9, NULL, NULL),
	(26, 'Colombo', 1, 12, 'Colombo', 'කොළඹ'),
	(27, 'Gampaha', 1, 12, 'Gampaha', 'ගම්පහ'),
	(28, 'Kalutara', 1, 12, 'Kalutara', 'කළුතර'),
	(29, 'Kandy', 1, 14, 'Kandy', 'මහනුවර'),
	(30, 'Matale', 1, 14, 'Matale', 'මාතලේ'),
	(31, 'Nuwara Eliya', 1, 14, 'Nuwara Eliya', 'නුවරඑළිය'),
	(32, 'Badulla', 1, 10, 'Badulla', 'බදුල්ල'),
	(33, 'Monaragala', 1, 10, 'Monaragala', 'මොණරාගල');

-- Dumping structure for table naita-web-new.locations_dsdivision
CREATE TABLE IF NOT EXISTS `locations_dsdivision` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `district_id` bigint NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `locations_dsdivision_name_district_id_bc4b0bf4_uniq` (`name`,`district_id`),
  KEY `locations_dsdivision_district_id_e7ba96c4_fk_locations` (`district_id`),
  CONSTRAINT `locations_dsdivision_district_id_e7ba96c4_fk_locations` FOREIGN KEY (`district_id`) REFERENCES `locations_district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.locations_dsdivision: ~314 rows (approximately)
REPLACE INTO `locations_dsdivision` (`id`, `name`, `is_active`, `district_id`, `name_en`, `name_si`) VALUES
	(21, 'Ambanganga Korale', 1, 2, NULL, NULL),
	(22, 'Dambulla', 1, 2, NULL, NULL),
	(23, 'Galewela', 1, 2, NULL, NULL),
	(24, 'Laggala-Pallegama', 1, 2, NULL, NULL),
	(25, 'Matale', 1, 2, NULL, NULL),
	(26, 'Naula', 1, 2, NULL, NULL),
	(27, 'Pallepola', 1, 2, NULL, NULL),
	(28, 'Ukuwela', 1, 2, NULL, NULL),
	(29, 'Wilgamuwa', 1, 2, NULL, NULL),
	(30, 'Yatawatta', 1, 2, NULL, NULL),
	(31, 'Ambagamuwa', 1, 3, NULL, NULL),
	(32, 'Kotmale', 1, 3, NULL, NULL),
	(33, 'Nuwara Eliya', 1, 3, NULL, NULL),
	(34, 'Walapane', 1, 3, NULL, NULL),
	(35, 'Addalaichenai', 1, 4, NULL, NULL),
	(36, 'Akkaraipattu', 1, 4, NULL, NULL),
	(37, 'Ampara', 1, 4, NULL, NULL),
	(38, 'Damana', 1, 4, NULL, NULL),
	(39, 'Dehiattakandiya', 1, 4, NULL, NULL),
	(40, 'Eragama', 1, 4, NULL, NULL),
	(41, 'Kalmunai', 1, 4, NULL, NULL),
	(42, 'Kalmunai Muslim', 1, 4, NULL, NULL),
	(43, 'Karaitivu', 1, 4, NULL, NULL),
	(44, 'Lahugala', 1, 4, NULL, NULL),
	(45, 'Maha Oya', 1, 4, NULL, NULL),
	(46, 'Navithanveli', 1, 4, NULL, NULL),
	(47, 'Ninthavur', 1, 4, NULL, NULL),
	(48, 'Padiyathalawa', 1, 4, NULL, NULL),
	(49, 'Sammanthurai', 1, 4, NULL, NULL),
	(50, 'Thirukkovil', 1, 4, NULL, NULL),
	(51, 'Uhana', 1, 4, NULL, NULL),
	(52, 'Chenkalady', 1, 5, NULL, NULL),
	(53, 'Eravur Pattu', 1, 5, NULL, NULL),
	(54, 'Eravur Town', 1, 5, NULL, NULL),
	(55, 'Kattankudy', 1, 5, NULL, NULL),
	(56, 'Koralai Pattu', 1, 5, NULL, NULL),
	(57, 'Koralai Pattu North', 1, 5, NULL, NULL),
	(58, 'Koralai Pattu South', 1, 5, NULL, NULL),
	(59, 'Manmunai North', 1, 5, NULL, NULL),
	(60, 'Manmunai Pattu', 1, 5, NULL, NULL),
	(61, 'Manmunai South-West', 1, 5, NULL, NULL),
	(62, 'Manmunai West', 1, 5, NULL, NULL),
	(63, 'Paddiruppu', 1, 5, NULL, NULL),
	(64, 'Vakarai', 1, 5, NULL, NULL),
	(65, 'Valachchenai', 1, 5, NULL, NULL),
	(66, 'Gomarankadawala', 1, 6, NULL, NULL),
	(67, 'Kanthale', 1, 6, NULL, NULL),
	(68, 'Kinniya', 1, 6, NULL, NULL),
	(69, 'Kuchchaweli', 1, 6, NULL, NULL),
	(70, 'Muttur', 1, 6, NULL, NULL),
	(71, 'Padavi Sri Pura', 1, 6, NULL, NULL),
	(72, 'Seruvila', 1, 6, NULL, NULL),
	(73, 'Thambalagamuwa', 1, 6, NULL, NULL),
	(74, 'Trincomalee Town and Gravets', 1, 6, NULL, NULL),
	(75, 'Verugal', 1, 6, NULL, NULL),
	(76, 'Delft', 1, 7, NULL, NULL),
	(77, 'Islands North', 1, 7, NULL, NULL),
	(78, 'Islands South', 1, 7, NULL, NULL),
	(79, 'Jaffna', 1, 7, NULL, NULL),
	(80, 'Karainagar', 1, 7, NULL, NULL),
	(81, 'Nallur', 1, 7, NULL, NULL),
	(82, 'Thenmarachchi', 1, 7, NULL, NULL),
	(83, 'Vadamarachchi East', 1, 7, NULL, NULL),
	(84, 'Vadamarachchi North', 1, 7, NULL, NULL),
	(85, 'Vadamarachchi South-West', 1, 7, NULL, NULL),
	(86, 'Valikamam East', 1, 7, NULL, NULL),
	(87, 'Valikamam North', 1, 7, NULL, NULL),
	(88, 'Valikamam South', 1, 7, NULL, NULL),
	(89, 'Valikamam South-West', 1, 7, NULL, NULL),
	(90, 'Valikamam West', 1, 7, NULL, NULL),
	(91, 'Kandavalai', 1, 8, NULL, NULL),
	(92, 'Karachchi', 1, 8, NULL, NULL),
	(93, 'Pachchilaipalli', 1, 8, NULL, NULL),
	(94, 'Poonakary', 1, 8, NULL, NULL),
	(95, 'Madhu', 1, 9, NULL, NULL),
	(96, 'Mannar Town', 1, 9, NULL, NULL),
	(97, 'Manthai East', 1, 9, NULL, NULL),
	(98, 'Manthai West', 1, 9, NULL, NULL),
	(99, 'Nanattan', 1, 9, NULL, NULL),
	(100, 'Musali', 1, 9, NULL, NULL),
	(101, 'Manthai East', 1, 10, NULL, NULL),
	(102, 'Maritimepattu', 1, 10, NULL, NULL),
	(103, 'Oddusuddan', 1, 10, NULL, NULL),
	(104, 'Puthukudiyiruppu', 1, 10, NULL, NULL),
	(105, 'Thunukkai', 1, 10, NULL, NULL),
	(106, 'Welioya', 1, 10, NULL, NULL),
	(107, 'Vavuniya', 1, 11, NULL, NULL),
	(108, 'Vavuniya North', 1, 11, NULL, NULL),
	(109, 'Vavuniya South', 1, 11, NULL, NULL),
	(110, 'Vengalacheddikulam', 1, 11, NULL, NULL),
	(111, 'Anuradhapura', 1, 12, NULL, NULL),
	(112, 'Galenbindunuwewa', 1, 12, NULL, NULL),
	(113, 'Galnewa', 1, 12, NULL, NULL),
	(114, 'Horowpothana', 1, 12, NULL, NULL),
	(115, 'Kahatagasdigiliya', 1, 12, NULL, NULL),
	(116, 'Kebithigollewa', 1, 12, NULL, NULL),
	(117, 'Kekirawa', 1, 12, NULL, NULL),
	(118, 'Mihinthale', 1, 12, NULL, NULL),
	(119, 'Nachchaduwa', 1, 12, NULL, NULL),
	(120, 'Nochchiyagama', 1, 12, NULL, NULL),
	(121, 'Nuwaragam Palatha Central', 1, 12, NULL, NULL),
	(122, 'Nuwaragam Palatha East', 1, 12, NULL, NULL),
	(123, 'Padaviya', 1, 12, NULL, NULL),
	(124, 'Palagala', 1, 12, NULL, NULL),
	(125, 'Palugaswewa', 1, 12, NULL, NULL),
	(126, 'Rajanganaya', 1, 12, NULL, NULL),
	(127, 'Rambewa', 1, 12, NULL, NULL),
	(128, 'Thalawa', 1, 12, NULL, NULL),
	(129, 'Thirappane', 1, 12, NULL, NULL),
	(130, 'Dimbulagala', 1, 13, NULL, NULL),
	(131, 'Elahera', 1, 13, NULL, NULL),
	(132, 'Hingurakgoda', 1, 13, NULL, NULL),
	(133, 'Lankapura', 1, 13, NULL, NULL),
	(134, 'Medirigiriya', 1, 13, NULL, NULL),
	(135, 'Thamankaduwa', 1, 13, NULL, NULL),
	(136, 'Welikanda', 1, 13, NULL, NULL),
	(137, 'Alawwa', 1, 14, NULL, NULL),
	(138, 'Ambanpola', 1, 14, NULL, NULL),
	(139, 'Arachchikattuwa', 1, 14, NULL, NULL),
	(140, 'Bingiriya', 1, 14, NULL, NULL),
	(141, 'Ehetuwewa', 1, 14, NULL, NULL),
	(142, 'Galgamuwa', 1, 14, NULL, NULL),
	(143, 'Ganewatta', 1, 14, NULL, NULL),
	(144, 'Ibbagamuwa', 1, 14, NULL, NULL),
	(145, 'Katugampola', 1, 14, NULL, NULL),
	(146, 'Kobeigane', 1, 14, NULL, NULL),
	(147, 'Kuliyapitiya East', 1, 14, NULL, NULL),
	(148, 'Kuliyapitiya West', 1, 14, NULL, NULL),
	(149, 'Maho', 1, 14, NULL, NULL),
	(150, 'Mallawapitiya', 1, 14, NULL, NULL),
	(151, 'Maspatha', 1, 14, NULL, NULL),
	(152, 'Mawathagama', 1, 14, NULL, NULL),
	(153, 'Narammala', 1, 14, NULL, NULL),
	(154, 'Nikaweratiya', 1, 14, NULL, NULL),
	(155, 'Panduwasnuwara East', 1, 14, NULL, NULL),
	(156, 'Panduwasnuwara West', 1, 14, NULL, NULL),
	(157, 'Pannala', 1, 14, NULL, NULL),
	(158, 'Polgahawela', 1, 14, NULL, NULL),
	(159, 'Pothuhera', 1, 14, NULL, NULL),
	(160, 'Rasnayakapura', 1, 14, NULL, NULL),
	(161, 'Ridiyagama', 1, 14, NULL, NULL),
	(162, 'Udubaddawa', 1, 14, NULL, NULL),
	(163, 'Wariyapola', 1, 14, NULL, NULL),
	(164, 'Weerambugedara', 1, 14, NULL, NULL),
	(165, 'Anamaduwa', 1, 15, NULL, NULL),
	(166, 'Arachchikattuwa', 1, 15, NULL, NULL),
	(167, 'Chilaw', 1, 15, NULL, NULL),
	(168, 'Dankotuwa', 1, 15, NULL, NULL),
	(169, 'Kalpitiya', 1, 15, NULL, NULL),
	(170, 'Madampe', 1, 15, NULL, NULL),
	(171, 'Mahakumbukkadawala', 1, 15, NULL, NULL),
	(172, 'Mundel', 1, 15, NULL, NULL),
	(173, 'Nattandiya', 1, 15, NULL, NULL),
	(174, 'Pallama', 1, 15, NULL, NULL),
	(175, 'Puttalam', 1, 15, NULL, NULL),
	(176, 'Wennappuwa', 1, 15, NULL, NULL),
	(177, 'Aranayake', 1, 16, NULL, NULL),
	(178, 'Bulathkohupitiya', 1, 16, NULL, NULL),
	(179, 'Dehiowita', 1, 16, NULL, NULL),
	(180, 'Deraniyagala', 1, 16, NULL, NULL),
	(181, 'Galigamuwa', 1, 16, NULL, NULL),
	(182, 'Kegalle', 1, 16, NULL, NULL),
	(183, 'Mawanella', 1, 16, NULL, NULL),
	(184, 'Rambukkana', 1, 16, NULL, NULL),
	(185, 'Ruwanwella', 1, 16, NULL, NULL),
	(186, 'Warakapola', 1, 16, NULL, NULL),
	(187, 'Yatiyantota', 1, 16, NULL, NULL),
	(188, 'Ayagama', 1, 17, NULL, NULL),
	(189, 'Balangoda', 1, 17, NULL, NULL),
	(190, 'Eheliyagoda', 1, 17, NULL, NULL),
	(191, 'Elapatha', 1, 17, NULL, NULL),
	(192, 'Godakawela', 1, 17, NULL, NULL),
	(193, 'Imbulpe', 1, 17, NULL, NULL),
	(194, 'Kahawatta', 1, 17, NULL, NULL),
	(195, 'Kalawana', 1, 17, NULL, NULL),
	(196, 'Kuruwita', 1, 17, NULL, NULL),
	(197, 'Nivitigala', 1, 17, NULL, NULL),
	(198, 'Pelmadulla', 1, 17, NULL, NULL),
	(199, 'Opanayake', 1, 17, NULL, NULL),
	(200, 'Ratnapura', 1, 17, NULL, NULL),
	(201, 'Waraka', 1, 17, NULL, NULL),
	(202, 'Welipitiya', 1, 17, NULL, NULL),
	(203, 'Akmeemana', 1, 18, NULL, NULL),
	(204, 'Ambalangoda', 1, 18, NULL, NULL),
	(205, 'Baddegama', 1, 18, NULL, NULL),
	(206, 'Balapitiya', 1, 18, NULL, NULL),
	(207, 'Bentota', 1, 18, NULL, NULL),
	(208, 'Bope-Poddala', 1, 18, NULL, NULL),
	(209, 'Elpitiya', 1, 18, NULL, NULL),
	(210, 'Galle Four Gravets', 1, 18, NULL, NULL),
	(211, 'Gonapinuwala', 1, 18, NULL, NULL),
	(212, 'Habaraduwa', 1, 18, NULL, NULL),
	(213, 'Hikkaduwa', 1, 18, NULL, NULL),
	(214, 'Imaduwa', 1, 18, NULL, NULL),
	(215, 'Karandeniya', 1, 18, NULL, NULL),
	(216, 'Nagoda', 1, 18, NULL, NULL),
	(217, 'Nelukdeniya', 1, 18, NULL, NULL),
	(218, 'Niyagama', 1, 18, NULL, NULL),
	(219, 'Thawalama', 1, 18, NULL, NULL),
	(220, 'Yakkalamulla', 1, 18, NULL, NULL),
	(221, 'Ambalantota', 1, 19, NULL, NULL),
	(222, 'Angunukolapelessa', 1, 19, NULL, NULL),
	(223, 'Beliatta', 1, 19, NULL, NULL),
	(224, 'Hambantota', 1, 19, NULL, NULL),
	(225, 'Katuwana', 1, 19, NULL, NULL),
	(226, 'Lunugamwehera', 1, 19, NULL, NULL),
	(227, 'Nonagama', 1, 19, NULL, NULL),
	(228, 'Okewela', 1, 19, NULL, NULL),
	(229, 'Sooriyawewa', 1, 19, NULL, NULL),
	(230, 'Tangalle', 1, 19, NULL, NULL),
	(231, 'Tissamaharama', 1, 19, NULL, NULL),
	(232, 'Walasmulla', 1, 19, NULL, NULL),
	(233, 'Weeraketiya', 1, 19, NULL, NULL),
	(234, 'Akuressa', 1, 20, NULL, NULL),
	(235, 'Athuraliya', 1, 20, NULL, NULL),
	(236, 'Devinuwara', 1, 20, NULL, NULL),
	(237, 'Dickwella', 1, 20, NULL, NULL),
	(238, 'Deniyaya', 1, 20, NULL, NULL),
	(239, 'Gandara', 1, 20, NULL, NULL),
	(240, 'Hakmana', 1, 20, NULL, NULL),
	(241, 'Kamburupitiya', 1, 20, NULL, NULL),
	(242, 'Kirinda Puhulwella', 1, 20, NULL, NULL),
	(243, 'Kotapola', 1, 20, NULL, NULL),
	(244, 'Malimbada', 1, 20, NULL, NULL),
	(245, 'Matara Four Gravets', 1, 20, NULL, NULL),
	(246, 'Mulatiyana', 1, 20, NULL, NULL),
	(247, 'Pasgoda', 1, 20, NULL, NULL),
	(248, 'Pitabeddara', 1, 20, NULL, NULL),
	(249, 'Thihagoda', 1, 20, NULL, NULL),
	(250, 'Weligama', 1, 20, NULL, NULL),
	(251, 'Weeraketiya', 1, 20, NULL, NULL),
	(252, 'Badulla', 1, 21, NULL, NULL),
	(253, 'Bandarawela', 1, 21, NULL, NULL),
	(254, 'Ella', 1, 21, NULL, NULL),
	(255, 'Haldummulla', 1, 21, NULL, NULL),
	(256, 'Hali-Ela', 1, 21, NULL, NULL),
	(257, 'Kandaketiya', 1, 21, NULL, NULL),
	(258, 'Lunugala', 1, 21, NULL, NULL),
	(259, 'Mahiyanganaya', 1, 21, NULL, NULL),
	(260, 'Meegahakiula', 1, 21, NULL, NULL),
	(261, 'Passara', 1, 21, NULL, NULL),
	(262, 'Rideemaliyadda', 1, 21, NULL, NULL),
	(263, 'Soranathota', 1, 21, NULL, NULL),
	(264, 'Uva Paranagama', 1, 21, NULL, NULL),
	(265, 'Welamada', 1, 21, NULL, NULL),
	(266, 'Badalkumbura', 1, 22, NULL, NULL),
	(267, 'Bibile', 1, 22, NULL, NULL),
	(268, 'Buttala', 1, 22, NULL, NULL),
	(269, 'Katharagama', 1, 22, NULL, NULL),
	(270, 'Madulla', 1, 22, NULL, NULL),
	(271, 'Medagama', 1, 22, NULL, NULL),
	(272, 'Monaragala', 1, 22, NULL, NULL),
	(273, 'Sevanagala', 1, 22, NULL, NULL),
	(274, 'Siyambalanduwa', 1, 22, NULL, NULL),
	(275, 'Thanamalwila', 1, 22, NULL, NULL),
	(276, 'Wellawaya', 1, 22, NULL, NULL),
	(277, 'Colombo', 1, 23, NULL, NULL),
	(278, 'Dehiwala', 1, 23, NULL, NULL),
	(279, 'Homagama', 1, 23, NULL, NULL),
	(280, 'Kaduwela', 1, 23, NULL, NULL),
	(281, 'Kolonnawa', 1, 23, NULL, NULL),
	(282, 'Maharagama', 1, 23, NULL, NULL),
	(283, 'Moratuwa', 1, 23, NULL, NULL),
	(284, 'Padukka', 1, 23, NULL, NULL),
	(285, 'Ratmalana', 1, 23, NULL, NULL),
	(286, 'Sri Jayawardenepura Kotte', 1, 23, NULL, NULL),
	(287, 'Thimbirigasyaya', 1, 23, NULL, NULL),
	(288, 'Attanagalla', 1, 24, NULL, NULL),
	(289, 'Biyagama', 1, 24, NULL, NULL),
	(290, 'Divulapitiya', 1, 24, NULL, NULL),
	(291, 'Dompe', 1, 24, NULL, NULL),
	(292, 'Gampaha', 1, 24, NULL, NULL),
	(293, 'Ja-Ela', 1, 24, NULL, NULL),
	(294, 'Katana', 1, 24, NULL, NULL),
	(295, 'Kelaniya', 1, 24, NULL, NULL),
	(296, 'Mahara', 1, 24, NULL, NULL),
	(297, 'Minuwangoda', 1, 24, NULL, NULL),
	(298, 'Mirigama', 1, 24, NULL, NULL),
	(299, 'Negombo', 1, 24, NULL, NULL),
	(300, 'Wattala', 1, 24, NULL, NULL),
	(301, 'Agalawatta', 1, 25, NULL, NULL),
	(302, 'Bandaragama', 1, 25, NULL, NULL),
	(303, 'Beruwala', 1, 25, NULL, NULL),
	(304, 'Bulathsinhala', 1, 25, NULL, NULL),
	(305, 'Dodangoda', 1, 25, NULL, NULL),
	(306, 'Horana', 1, 25, NULL, NULL),
	(307, 'Ingiriya', 1, 25, NULL, NULL),
	(308, 'Kalutara', 1, 25, NULL, NULL),
	(309, 'Madurawala', 1, 25, NULL, NULL),
	(310, 'Matugama', 1, 25, NULL, NULL),
	(311, 'Millaniya', 1, 25, NULL, NULL),
	(312, 'Palindanuwara', 1, 25, NULL, NULL),
	(313, 'Panadura', 1, 25, NULL, NULL),
	(314, 'Walallawita', 1, 25, NULL, NULL),
	(315, 'Mahiyanganaya', 1, 32, 'Mahiyanganaya', 'මහියංගනය'),
	(316, 'Meegahakiula', 1, 32, 'Meegahakiula', 'මීගහකිවුල'),
	(317, 'Rideemaliyadda', 1, 32, 'Rideemaliyadda', 'රිදීමාලියද්ද');

-- Dumping structure for table naita-web-new.locations_province
CREATE TABLE IF NOT EXISTS `locations_province` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_en` (`name_en`),
  UNIQUE KEY `name_si` (`name_si`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.locations_province: ~9 rows (approximately)
REPLACE INTO `locations_province` (`id`, `name`, `is_active`, `name_en`, `name_si`) VALUES
	(1, 'Central Province', 1, NULL, NULL),
	(2, 'Eastern Province', 1, NULL, NULL),
	(3, 'Northern Province', 1, NULL, NULL),
	(4, 'North Central Province', 1, NULL, NULL),
	(5, 'North Western Province', 1, NULL, NULL),
	(6, 'Sabaragamuwa Province', 1, NULL, NULL),
	(7, 'Southern Province', 1, NULL, NULL),
	(8, 'Uva Province', 1, NULL, NULL),
	(9, 'Western Province', 1, NULL, NULL),
	(10, 'Uva', 1, 'Uva', 'ඌව'),
	(12, 'Western', 1, 'Western', 'බස්නාහිර'),
	(14, 'Central', 1, 'Central', 'මධ්‍යම');

-- Dumping structure for table naita-web-new.news_newscategory
CREATE TABLE IF NOT EXISTS `news_newscategory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_si` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.news_newscategory: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.news_newspost
CREATE TABLE IF NOT EXISTS `news_newspost` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(100) NOT NULL,
  `post_type` varchar(2) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `author_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `views` int unsigned NOT NULL,
  `content_en` longtext,
  `content_si` longtext,
  `description_en` longtext,
  `description_si` longtext,
  `title_en` varchar(200) DEFAULT NULL,
  `title_si` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `news_newspost_author_id_7c46e213_fk_users_user_id` (`author_id`),
  KEY `news_newspost_category_id_05fdb05b_fk_news_newscategory_id` (`category_id`),
  CONSTRAINT `news_newspost_author_id_7c46e213_fk_users_user_id` FOREIGN KEY (`author_id`) REFERENCES `users_user` (`id`),
  CONSTRAINT `news_newspost_category_id_05fdb05b_fk_news_newscategory_id` FOREIGN KEY (`category_id`) REFERENCES `news_newscategory` (`id`),
  CONSTRAINT `news_newspost_chk_1` CHECK ((`views` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.news_newspost: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.testimonials_testimonial
CREATE TABLE IF NOT EXISTS `testimonials_testimonial` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `quote` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `student_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `testimonials_testimonial_student_id_cd75a851_fk_users_user_id` (`student_id`),
  CONSTRAINT `testimonials_testimonial_student_id_cd75a851_fk_users_user_id` FOREIGN KEY (`student_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.testimonials_testimonial: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.users_user
CREATE TABLE IF NOT EXISTS `users_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_type` smallint unsigned NOT NULL,
  `nic_number` varchar(12) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `address` longtext,
  `date_of_birth` date DEFAULT NULL,
  `district_id` bigint DEFAULT NULL,
  `education_qualifications` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `profile_picture` varchar(100) DEFAULT NULL,
  `work_experience` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `is_verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nic_number` (`nic_number`),
  KEY `users_user_district_id_42933a3a` (`district_id`),
  CONSTRAINT `users_user_district_id_42933a3a_fk_locations_district_id` FOREIGN KEY (`district_id`) REFERENCES `locations_district` (`id`),
  CONSTRAINT `users_user_chk_1` CHECK ((`user_type` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.users_user: ~3 rows (approximately)
REPLACE INTO `users_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `user_type`, `nic_number`, `phone`, `address`, `date_of_birth`, `district_id`, `education_qualifications`, `profile_picture`, `work_experience`, `is_verified`) VALUES
	(1, 'pbkdf2_sha256$1000000$wb2xChlJXah5H1wak4Ol45$ms3AQq0uZtm7wEdRMVoXHKLoLptlGjpexyEM9EtHWkk=', '2025-06-24 03:30:34.298473', 1, 'praneeth', 'praneeth', 'swedseds', 'anymail@gmail.com', 1, 1, '2025-06-22 16:16:13.220756', 3, '942035105v', '0719603838', NULL, '2024-12-31', 8, '[]', '', '[]', 0),
	(5, 'pbkdf2_sha256$1000000$RXTmEKr9rYGrlnSwB9eKqO$i9GS/wsJlciZASaTmaGRf2zF2HXPz/pVyPTUJJDi15Y=', '2025-06-25 16:47:42.991073', 1, 'praneeth12', 'praneeth', 'weerawardhana', 'p.nishada94@gmail.com', 1, 1, '2025-06-25 07:17:20.505882', 3, '942031874V', '0719603838', NULL, '1994-07-21', 32, '[]', '', '[]', 1),
	(6, 'pbkdf2_sha256$1000000$clSY1PJBhLgbBhM60yTrMP$9VgxL3kkTzHt/DuJWc4GInnFOJEHEc5skIuCpzAJ9b8=', NULL, 0, 'user1', 'user', 'new', 'user1@gmail.com', 0, 1, '2025-06-25 16:44:48.901611', 3, '882031874V', '0717777777', NULL, '2024-02-28', 29, '[]', '', '[]', 0);

-- Dumping structure for table naita-web-new.users_user_groups
CREATE TABLE IF NOT EXISTS `users_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.users_user_groups: ~0 rows (approximately)

-- Dumping structure for table naita-web-new.users_user_user_permissions
CREATE TABLE IF NOT EXISTS `users_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table naita-web-new.users_user_user_permissions: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
