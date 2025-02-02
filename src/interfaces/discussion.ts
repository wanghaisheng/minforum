import { userProp } from './user';
import { categoryProp } from 'interfaces/category';
export interface discussionProp {
  userId?: string;
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  comment?: number;
  categoryId?: any;
  category?: categoryProp;
  profile?: userProp;
  authRequired?: boolean;
  edited?: boolean;
  premium?: boolean;
  likes?: any[];
  status?: string;
  bestAnswer?: string;
  lastAwarded?: string;
  action?: any;
  view?: number;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
