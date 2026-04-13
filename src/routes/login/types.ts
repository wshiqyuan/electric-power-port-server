export type MenuListTree = {
	name: string;
	url: string;
	icon: string;
	children?: MenuListTree[];
};

export type MenuItem = {
	id: number;
	parentId: number | null;
	name: string;
	url: string;
	icon: string;
	enabled: unknown;
};
