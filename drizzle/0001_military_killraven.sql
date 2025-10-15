CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` text NOT NULL,
	`image` text NOT NULL,
	`gender` text NOT NULL,
	`category` text NOT NULL,
	`sizes` text NOT NULL,
	`brand` text,
	`created_at` text NOT NULL
);
