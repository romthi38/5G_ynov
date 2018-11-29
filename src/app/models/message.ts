import { User } from '@models/user';

export interface Message {
  id: number;
  author: User;
  content: string;
  createdAt: string;
}
