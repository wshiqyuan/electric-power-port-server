import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { timestamps } from "../columns.helpers";

export const usersTable = mysqlTable(
	"system_users",
	{
		id: int().autoincrement().primaryKey(),
		userId: varchar({ length: 255 }).unique().notNull(),
		username: varchar({ length: 50 }).notNull(),
		password: varchar({ length: 255 }).notNull(),
		nickname: varchar({ length: 50 }).notNull(),
		phone: varchar({ length: 11 }).notNull(),
		idNumber: varchar({ length: 18 }).notNull(),
		role: varchar({ length: 50 }).notNull().default("user"),
		position: varchar({ length: 50 }).notNull(),
		department: varchar({ length: 50 }).notNull(),
		pageAuthority: varchar({ length: 100 }).notNull(),
		buttonAuthority: varchar({ length: 100 }).notNull(),
		status: tinyint().notNull().default(1),
		sex: int().notNull(),
		...timestamps,
	},
	(t) => [
		index("idx_username").on(t.username),
		index("idx_role").on(t.role),
		index("idx_status").on(t.status),
	],
);
