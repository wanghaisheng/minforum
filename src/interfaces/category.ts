type iconData = {
  icon: string;
  type: string;
};
export interface categoryProp {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  discussion?: number;
  authRequired?: boolean;
  color?: string;
  moderator?: string | string[];
  logo?: string;
  icon?: iconData;
  adminId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
