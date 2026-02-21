export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}
