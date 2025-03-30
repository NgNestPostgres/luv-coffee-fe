export interface MenuItemNode {
  name: string;
  iconName?: string,
  path?: string[];
  children?: MenuItemNode[];
}
