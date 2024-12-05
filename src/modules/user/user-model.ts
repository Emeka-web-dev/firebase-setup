export interface User {
  id?: string;
  email: string;
  displayName?: string;
  createdAt?: Date;
  role?: "user" | "admin";
}

export interface CreateUserDTO {
  email: string;
  password: string;
  displayName?: string;
}
