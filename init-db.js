import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
	url: process.env.DB_FILE_NAME,
});

async function initializeDatabase() {
	try {
		const sqlStatements = `
      INSERT INTO menu_config (id, parent_id, name, url, icon, sort_order)
      VALUES
      (1, NULL, '数据看板', '/dashboard', 'DataLine', 1),
      (2, NULL, '充电站管理', '/chargingstation', 'Lightning', 2),
      (3, 2, '充电站监控', '/chargingstation/monitor', 'VideoCamera', 1),
      (4, 2, '营收统计', '/chargingstation/revenue', 'DataAnalysis', 2),
      (5, 2, '充电桩管理', '/chargingstation/manage', 'Warning', 3),
      (6, NULL, '电子地图', '/map', 'MapLocation', 3),
      (7, NULL, '运营管理', '/operations', 'Files', 4),
      (8, 7, '订单管理', '/operations/orders', 'DocumentCopy', 1),
      (9, 7, '订单详情', '/operations/detail', 'Share', 2),
      (10, 7, '计费管理', '/operations/total', 'Money', 3),
      (11, NULL, '报警管理', '/alarm', 'Phone', 5),
      (12, NULL, '会员卡管理', '/member', 'Magnet', 6),
      (13, NULL, '招商管理', '/business', 'Document', 7),
      (14, NULL, '系统设置', '/system', 'Setting', 8),
      (15, NULL, '个人中心', '/personal', 'User', 9);

      INSERT INTO role_menu_permissions (role, menu_id, enabled)
      VALUES
      ('admin', 1, 1),
      ('admin', 2, 1),
      ('admin', 3, 1),
      ('admin', 4, 1),
      ('admin', 5, 1),
      ('admin', 6, 1),
      ('admin', 7, 1),
      ('admin', 8, 1),
      ('admin', 9, 1),
      ('admin', 10, 1),
      ('admin', 11, 1),
      ('admin', 12, 1),
      ('admin', 13, 1),
      ('admin', 14, 1),
      ('admin', 15, 1),
      ('user', 1, 1),
      ('user', 2, 1),
      ('user', 3, 1),
      ('user', 4, 1),
      ('user', 6, 1),
      ('user', 7, 1),
      ('user', 8, 1),
      ('user', 9, 1),
      ('user', 11, 1),
      ('user', 12, 1),
      ('user', 15, 1);

      INSERT INTO system_users (user_id, username, password, nickname, phone, id_number, role, position, department, page_authority, button_authority, sex)
      VALUES
      ('8d229a8264a64df394c41cab0028ddf8', 'admin', '$2a$12$ISS7hPUGXXJOkvFPVhHT7OeAXgOmydDO9nRpXvo8UOmtTsnkFZFhu', '张三', '18628482325', '320000202202244389','admin', '运营经理', '运营部', 'admin', 'add,edit,delete', 1),
      ('ba949593c17b42e0916043e5a0b5f8c6', 'user', '$2a$12$czEPWUz0ycTUS9XesZWfEuOucOGqufmNQxGiq040CkeTlq0wON8bK', '李四', '18588338047', '450000201608065270', 'user', '运营专员','运营部', 'user', 'edit', 1 );

      INSERT INTO role_button_permissions (role, button_key, enabled)
      VALUES
      ('admin',  'add', 1),
      ('admin', 'edit', 1),
      ('admin', 'delete', 1),
      ('user', 'add', 0),
      ('user', 'edit', 0),
      ('user', 'delete', 0);

    `;

		const statements = sqlStatements
			.split(";")
			.filter((stmt) => stmt.trim() !== "");

		for (const statement of statements) {
			if (statement.trim()) {
				await client.execute(statement.trim());
			}
		}

		console.log("数据插入成功！");
	} catch (error) {
		console.error("错误:", error);
	} finally {
	}
}

initializeDatabase();
