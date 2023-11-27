-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dbo.Consultation`
--

DROP TABLE IF EXISTS `dbo.Consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbo.Consultation` (
  `id` tinyint(4) DEFAULT NULL,
  `consultationMsg` varchar(7) DEFAULT NULL,
  `isRead` tinyint(4) DEFAULT NULL,
  `registerDate` varchar(19) DEFAULT NULL,
  `patient_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbo.Consultation`
--

LOCK TABLES `dbo.Consultation` WRITE;
/*!40000 ALTER TABLE `dbo.Consultation` DISABLE KEYS */;
INSERT INTO `dbo.Consultation` VALUES (4,'fsfscyh',0,'2020-11-10 19:45:13',4),(6,'test3',0,'2020-11-03 18:48:01',6),(7,'fgsgsd',1,'2020-11-03 19:20:34',4);
/*!40000 ALTER TABLE `dbo.Consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbo.Measurement`
--

DROP TABLE IF EXISTS `dbo.Measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbo.Measurement` (
  `id` tinyint(4) DEFAULT NULL,
  `bloodGlucoseLevel` decimal(5,1) DEFAULT NULL,
  `carbIntake` smallint(6) DEFAULT NULL,
  `measurementDate` varchar(19) DEFAULT NULL,
  `user_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbo.Measurement`
--

LOCK TABLES `dbo.Measurement` WRITE;
/*!40000 ALTER TABLE `dbo.Measurement` DISABLE KEYS */;
INSERT INTO `dbo.Measurement` VALUES (1,34.0,335,'2020-11-03 02:00:00',4),(2,664.0,8,'2020-11-03 02:00:00',4),(4,4555.0,222,'2020-11-03 15:02:22',6),(6,889.0,33,'2020-11-03 18:50:18',5),(7,66.0,789,'2020-11-03 18:50:27',5),(8,999.0,67,'2020-11-03 18:50:38',5),(9,55.0,45,'2020-11-10 19:32:56',4);
/*!40000 ALTER TABLE `dbo.Measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbo.Measurements`
--

DROP TABLE IF EXISTS `dbo.Measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbo.Measurements` (
  `id` varchar(0) DEFAULT NULL,
  `bloodGlucoseLevel` varchar(0) DEFAULT NULL,
  `carbIntake` varchar(0) DEFAULT NULL,
  `measurementDate` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbo.Measurements`
--

LOCK TABLES `dbo.Measurements` WRITE;
/*!40000 ALTER TABLE `dbo.Measurements` DISABLE KEYS */;
/*!40000 ALTER TABLE `dbo.Measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbo.PatientDoctorAssociation`
--

DROP TABLE IF EXISTS `dbo.PatientDoctorAssociation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbo.PatientDoctorAssociation` (
  `id` tinyint(4) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `doctor_id` varchar(1) DEFAULT NULL,
  `patient_id` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbo.PatientDoctorAssociation`
--

LOCK TABLES `dbo.PatientDoctorAssociation` WRITE;
/*!40000 ALTER TABLE `dbo.PatientDoctorAssociation` DISABLE KEYS */;
INSERT INTO `dbo.PatientDoctorAssociation` VALUES (1,1,'1',4),(2,1,'1',5),(3,1,'1',6),(4,1,'',7);
/*!40000 ALTER TABLE `dbo.PatientDoctorAssociation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbo.Users`
--

DROP TABLE IF EXISTS `dbo.Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbo.Users` (
  `id` tinyint(4) DEFAULT NULL,
  `accountType` tinyint(4) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `address` varchar(18) DEFAULT NULL,
  `amka` int(11) DEFAULT NULL,
  `email` varchar(14) DEFAULT NULL,
  `first_name` varchar(13) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `lastLogin` varchar(19) DEFAULT NULL,
  `last_name` varchar(12) DEFAULT NULL,
  `mobile_phone_number` bigint(20) DEFAULT NULL,
  `password` mediumint(9) DEFAULT NULL,
  `phone_number` bigint(20) DEFAULT NULL,
  `registration_date` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbo.Users`
--

LOCK TABLES `dbo.Users` WRITE;
/*!40000 ALTER TABLE `dbo.Users` DISABLE KEYS */;
INSERT INTO `dbo.Users` VALUES (1,2,1,'Sikies, Eplidos 34',123456789,'dr1@hotmail.gr','Dr1Paraskevas',2,'2020-11-14 12:25:38','dr1Lysikatos',6934449321,123456,6934449321,'2020-11-02 00:01:10'),(2,4,1,'Sikies, Eplidos 34',123456780,'dr2@hotmail.gr','Dr2Paraskevas',2,'2020-05-03 00:00:00','dr2Lysikatos',6934449321,123456,6934449321,'2020-11-02 00:01:50'),(3,1,1,'Sikies, Eplidos 34',123456700,'cf@hotmail.gr','CfParaskevas',1,'2020-11-10 19:47:49','cfLysikatos',6934449321,123456,6934449321,'2020-11-02 00:02:36'),(4,3,1,'Sikies, Eplidos 34',123456000,'p1@hotmail.gr','p1Paraskevas',1,'2020-11-10 19:32:26','p1Lysikatos',6934449321,123456,6934449321,'2020-01-02 00:03:16'),(5,3,1,'Sikies, Eplidos 34',123450003,'p2@hotmail.gr','p2Paraskevas',1,'2020-11-03 18:49:22','p2Lysikatos',6934449321,123456,6934449321,'2020-06-02 00:03:50'),(6,3,1,'Sikies, Eplidos 34',244242425,'p3@hotmail.gr','p3Paraskevas',1,'2020-11-03 15:02:08','p3Lysikatos',6934449321,123456,6934449321,'2020-11-03 15:01:40'),(7,3,1,'Sikies, Eplidos 34',533644743,'p4@hotmail.gr','p4Paraskevas',1,'','p4Lysikatos',6934449321,123456,6934449321,'2020-11-03 18:38:58'),(8,4,1,'Sikies, Eplidos 34',643433662,'dr3@hotmail.gr','dr3Paraskevas',2,'','dr3Lysikatos',6934449321,123456,6934449321,'2020-11-03 18:42:22');
/*!40000 ALTER TABLE `dbo.Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 10:46:25
