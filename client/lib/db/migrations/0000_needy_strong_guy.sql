CREATE TABLE
	`account` (
		`userId` varchar(255) NOT NULL,
		`type` varchar(255) NOT NULL,
		`provider` varchar(255) NOT NULL,
		`providerAccountId` varchar(255) NOT NULL,
		`refresh_token` varchar(255),
		`access_token` varchar(255),
		`expires_at` int,
		`token_type` varchar(255),
		`scope` varchar(255),
		`id_token` varchar(2048),
		`session_state` varchar(255),
		CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY (`provider`, `providerAccountId`)
	);

CREATE TABLE
	`companies` (
		`id` bigint AUTO_INCREMENT NOT NULL,
		`authorId` varchar(256),
		`name` text,
		`desc` text,
		`image` text,
		CONSTRAINT `companies_id` PRIMARY KEY (`id`),
		CONSTRAINT `companies_id_unique` UNIQUE (`id`)
	);

CREATE TABLE
	`session` (
		`sessionToken` varchar(255) NOT NULL,
		`userId` varchar(255) NOT NULL,
		`expires` timestamp NOT NULL,
		CONSTRAINT `session_sessionToken` PRIMARY KEY (`sessionToken`)
	);

CREATE TABLE
	`user` (
		`id` varchar(255) NOT NULL,
		`name` varchar(255),
		`email` varchar(255) NOT NULL,
		`emailVerified` timestamp(3),
		`image` varchar(255),
		CONSTRAINT `users_id` PRIMARY KEY (`id`)
	);

CREATE TABLE
	`verificationToken` (
		`identifier` varchar(255) NOT NULL,
		`token` varchar(255) NOT NULL,
		`expires` timestamp NOT NULL,
		CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY (`identifier`, `token`)
	);

ALTER TABLE `account` ADD CONSTRAINT `account_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE cascade ON UPDATE no action;

ALTER TABLE `session` ADD CONSTRAINT `session_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE cascade ON UPDATE no action;