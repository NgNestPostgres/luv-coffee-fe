export interface MenuItemNode {
  name: string;
  path?: string[];
  children?: MenuItemNode[];
}

export interface MenuItemFlatNode {
  expandable: boolean;
  name: string;
  path: string[] | null;
  level: number;
}
