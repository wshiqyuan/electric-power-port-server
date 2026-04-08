import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("t_users", {
	id: serial().primaryKey(),
	user_id: varchar({ length: 255 }).unique().notNull(),
	username: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	sex: int().notNull(),
});
