import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { tableId, timestamps } from "../utils/columns.helpers";

export const usersTable = mysqlTable(
	"system_users",
	{
		id: tableId(),
		userId: varchar({ length: 255 }).unique().notNull(),
		username: varchar({ length: 50 }).unique().notNull(), // 用户名
		password: varchar({ length: 255 }).notNull(),
		nickname: varchar({ length: 50 }).notNull(), // 姓名
		phone: varchar({ length: 11 }).notNull(),
		idNumber: varchar({ length: 18 }).notNull(),
		role: varchar({ length: 50 }).notNull().default("user"),
		position: varchar({ length: 50 }).notNull(),
		department: varchar({ length: 50 }).notNull(),
		pageAuthority: varchar({ length: 100 }).notNull(),
		buttonAuthority: varchar({ length: 100 }).notNull(),
		isDeleted: tinyint().default(0), // 数据状态：0-正常，1-删除
		sex: int().notNull(), // 性别：1-男，2-女
		...timestamps,
	},
	(t) => [
		index("idx_username").on(t.username),
		index("idx_role").on(t.role),
		index("idx_deleted").on(t.isDeleted),
	],
);
