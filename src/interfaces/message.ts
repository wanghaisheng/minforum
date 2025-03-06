import { userProp } from './user';

export interface messageProp {
  id?: string;
  channel?: string;
  content?: string;
  sender?: string;
  receiver?: string;
  timestamp?: number;
  type?: 'text' | 'image';
  profile?: userProp;
  count?: number;
  read?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
