export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    emailVerified?: boolean;
  }

export const ROLE = ['cliente', 'asesor', 'admin'];
