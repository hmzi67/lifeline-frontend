export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthUser extends User {
  token: string;
}
