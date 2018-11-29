export interface UserStatus {
  id: number;
  name: string;
}

export interface User {
  id: number;
  login: string;
  status: UserStatus;
  avatar: string;
  lastname: string;
  firstname: string;
  email?: string;
  lastConnectionDate?: string;
  isAdmin?: boolean;
}
