import type { MenuItem, MenuListTree } from "./types";
export function buildMenuTree(items: MenuItem[]): MenuListTree[] {
	const map: Record<number, MenuListTree> = {};

	items.forEach((item) => {
		if (item.enabled) {
			map[item.id] = {
				name: item.name,
				url: item.url,
				icon: item.icon,
				children: [],
			};
		}
	});

	const tree: MenuListTree[] = [];
	items.forEach((item) => {
		if (!map[item.id]) {
			return;
		}

		if (item.parentId && map[item.parentId]) {
			map[item.parentId].children?.push({ ...map[item.id] });
		} else {
			tree.push(map[item.id]);
		}
	});

	return tree;
}
