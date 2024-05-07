-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 07, 2024 lúc 01:35 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `mycalendar`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `apms`
--

CREATE TABLE `apms` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `isGroup` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `apms`
--

INSERT INTO `apms` (`id`, `ownerId`, `title`, `location`, `date`, `startTime`, `endTime`, `isGroup`, `createdAt`, `updatedAt`) VALUES
(20043, 10003, 'Giải tích 2', 'F109', '2024-04-15', '07:00:00', '09:50:00', 0, '2024-04-12 06:04:47', '2024-04-12 06:04:47'),
(20044, 10003, 'Họp lớp', 'C103', '2024-04-20', '17:30:00', '18:50:00', 1, '2024-04-12 06:05:29', '2024-04-12 06:05:29'),
(20051, 10002, 'Group meeting 02', 'Hội trường khu F - DHBK', '2024-04-21', '07:00:00', '11:00:00', 1, '2024-04-12 14:33:36', '2024-04-12 14:33:36'),
(20069, 10002, 'Học nhóm ABC', 'Coffee 404', '2024-04-21', '20:00:00', '21:30:00', 1, '2024-04-13 10:09:40', '2024-04-13 10:09:40'),
(20070, 10002, 'Học nhóm XYZ', 'Somewhere', '2024-04-14', '19:00:00', '21:30:00', 1, '2024-04-13 10:10:23', '2024-04-13 10:10:23'),
(20071, 10001, 'Học nhóm XYZ', 'Nhà', '2024-04-13', '17:10:00', '19:40:00', 0, '2024-04-13 10:11:30', '2024-04-13 10:11:30'),
(20072, 10002, 'Đá bóng', 'Sân bóng', '2024-04-17', '15:30:00', '18:00:00', 1, '2024-04-13 10:27:04', '2024-04-13 10:27:04'),
(20080, 10001, 'Tình nguyện 2024', 'Địa điểm mới', '2024-04-21', '14:30:00', '17:20:00', 0, '2024-04-15 16:20:12', '2024-04-15 16:20:12'),
(20081, 10003, 'Họp lớp đợt 2', 'C102', '2024-04-28', '17:30:00', '19:00:00', 1, '2024-04-15 16:35:44', '2024-04-15 16:35:44'),
(20083, 10001, 'Nghỉ lễ 1/5', 'Ở nhà', '2024-05-01', '00:00:00', '23:59:00', 0, '2024-04-16 11:37:06', '2024-04-16 11:37:06'),
(20092, 10001, 'Xác suât thống kê', 'F209 - Trường DHBK', '2024-05-08', '07:00:00', '09:50:00', 0, '2024-04-24 08:38:48', '2024-04-24 08:38:48'),
(20096, 10001, 'Xem phim', 'Rạp chiếu phim', '2024-04-28', '19:10:00', '21:00:00', 0, '2024-04-24 08:44:53', '2024-04-24 08:44:53'),
(20098, 10001, 'Làm bài tập OOAD', 'Ở nhà', '2024-05-19', '19:41:00', '21:11:00', 0, '2024-05-07 09:41:28', '2024-05-07 09:41:28'),
(20100, 10001, 'Họp nhóm làm PBL3', 'B206', '2024-05-18', '13:00:00', '17:00:00', 1, '2024-05-07 09:43:25', '2024-05-07 09:43:25'),
(20101, 10003, 'Làm bài tập nhóm SE', 'Sảnh khu A', '2024-05-17', '14:00:00', '17:00:00', 1, '2024-05-07 09:45:00', '2024-05-07 09:45:00'),
(20102, 10001, 'Ôn tập XSTK', 'Ở nhà', '2024-05-22', '19:00:00', '22:00:00', 0, '2024-05-07 09:47:26', '2024-05-07 09:47:26'),
(20103, 10001, 'Xem phim', 'Rạp chiếu phim', '2024-05-11', '09:09:00', '10:31:00', 0, '2024-05-07 10:01:29', '2024-05-07 10:01:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gmps`
--

CREATE TABLE `gmps` (
  `id` int(11) NOT NULL,
  `apmId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `gmps`
--

INSERT INTO `gmps` (`id`, `apmId`, `userId`, `createdAt`, `updatedAt`) VALUES
(40005, 20069, 10001, '2024-04-13 10:10:52', '2024-04-13 10:10:52'),
(40011, 20072, 10029, '2024-04-13 11:35:47', '2024-04-13 11:35:47'),
(40019, 20100, 10003, '2024-05-07 09:44:07', '2024-05-07 09:44:07'),
(40020, 20101, 10001, '2024-05-07 09:46:18', '2024-05-07 09:46:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reminders`
--

CREATE TABLE `reminders` (
  `id` int(11) NOT NULL,
  `appointmentId` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reminders`
--

INSERT INTO `reminders` (`id`, `appointmentId`, `duration`, `createdAt`, `updatedAt`, `userId`) VALUES
(30015, 20044, 30, '2024-04-13 07:09:15', '2024-04-13 07:09:15', 10003),
(30016, 20044, 60, '2024-04-13 07:09:50', '2024-04-13 07:09:50', 10001),
(30019, 20051, 15, '2024-04-13 08:47:38', '2024-04-13 08:47:38', 10001),
(30027, 20080, 120, '2024-04-17 08:18:02', '2024-04-17 08:18:02', 10001),
(30029, 20081, 45, '2024-04-24 10:01:20', '2024-04-24 10:01:20', 10001),
(30030, 20092, 51, '2024-05-07 09:34:32', '2024-05-07 09:34:32', 10001),
(30032, 20100, 10, '2024-05-07 09:43:25', '2024-05-07 09:43:25', 10001),
(30033, 20100, 30, '2024-05-07 09:44:07', '2024-05-07 09:44:07', 10003),
(30034, 20101, 15, '2024-05-07 09:45:00', '2024-05-07 09:45:00', 10003),
(30035, 20101, 20, '2024-05-07 09:46:18', '2024-05-07 09:46:18', 10001),
(30036, 20102, 20, '2024-05-07 09:47:26', '2024-05-07 09:47:26', 10001),
(30038, 20103, 10, '2024-05-07 11:26:02', '2024-05-07 11:26:02', 10001);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240410134805-create-user.js'),
('20240410135650-create-appointment.js'),
('20240410135929-create-gm-participant.js'),
('20240410140030-create-reminder.js'),
('20240412015707-create-apm.js'),
('20240412133503-create-gmp.js'),
('20240413064902-Reminder.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(10001, 'Le Duc Bao', 'ldb258204@gmail.com', 'adminadmin', '2024-04-10 21:25:05', '2024-04-10 21:25:05'),
(10002, 'New User', 'newuser@yahoo.fake.com', 'hufhduhfh432', '2024-04-11 09:46:37', '2024-04-11 09:46:37'),
(10003, 'd e v 0 1 d', 'dev01d@gmail.com', '111111', '2024-04-11 12:45:49', '2024-04-11 12:45:49'),
(10029, 'Test User', 'tester@dut.udn.vn', '123tester@', '2024-04-11 16:33:51', '2024-04-11 16:33:51');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `apms`
--
ALTER TABLE `apms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belong to` (`ownerId`);

--
-- Chỉ mục cho bảng `gmps`
--
ALTER TABLE `gmps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apmId` (`apmId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointmentId` (`appointmentId`),
  ADD KEY `reminders_ibfk_2` (`userId`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `apms`
--
ALTER TABLE `apms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20104;

--
-- AUTO_INCREMENT cho bảng `gmps`
--
ALTER TABLE `gmps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40021;

--
-- AUTO_INCREMENT cho bảng `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30039;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10032;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `apms`
--
ALTER TABLE `apms`
  ADD CONSTRAINT `belong to` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `gmps`
--
ALTER TABLE `gmps`
  ADD CONSTRAINT `gmps_ibfk_1` FOREIGN KEY (`apmId`) REFERENCES `apms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gmps_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`appointmentId`) REFERENCES `apms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reminders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
