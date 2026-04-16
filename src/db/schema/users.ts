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
		userId: varchar({ length: 255 }).unique().notNull(), // 用户id
		username: varchar({ length: 50 }).unique().notNull(), // 用户名
		password: varchar({ length: 255 }).notNull(), // 密码
		nickname: varchar({ length: 50 }).notNull(), // 姓名
		phone: varchar({ length: 11 }).notNull(), // 手机号
		idNumber: varchar({ length: 18 }).notNull(), // 身份证号码
		role: varchar({ length: 50 }).notNull().default("user"), // 角色
		position: varchar({ length: 50 }).notNull(), // 职位
		department: varchar({ length: 50 }).notNull(), // 部门
		pageAuthority: varchar({ length: 100 }).notNull(), // 页面权限
		buttonAuthority: varchar({ length: 100 }).notNull(), // 按钮权限
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
