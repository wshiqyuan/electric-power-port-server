import {
	index,
	int,
	sqliteTable as table,
	text,
} from "drizzle-orm/sqlite-core";
import { tableId, timestamps } from "../utils/columns.helpers";

export const usersTable = table(
	"system_users",
	{
		id: tableId(),
		userId: text({ length: 255 }).unique().notNull(), // 用户id
		username: text({ length: 50 }).unique().notNull(), // 用户名
		password: text({ length: 255 }).notNull(), // 密码
		nickname: text({ length: 50 }).notNull(), // 姓名
		phone: text({ length: 11 }).notNull(), // 手机号
		idNumber: text({ length: 18 }).notNull(), // 身份证号码
		role: text({ length: 50 }).notNull().default("user"), // 角色
		position: text({ length: 50 }).notNull(), // 职位
		department: text({ length: 50 }).notNull(), // 部门
		pageAuthority: text({ length: 100 }).notNull(), // 页面权限
		buttonAuthority: text({ length: 100 }).notNull(), // 按钮权限
		isDeleted: int().default(0), // 数据状态：0-正常，1-删除
		sex: int().notNull(), // 性别：1-男，2-女
		...timestamps,
	},
	(t) => [
		index("idx_system_users_username").on(t.username),
		index("idx_system_users_role").on(t.role),
		index("idx_system_users_deleted").on(t.isDeleted),
	],
);
