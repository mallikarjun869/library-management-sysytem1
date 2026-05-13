export type Role = 'student' | 'employee' | 'admin';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverUrl: string;
  count: number;
  available: number;
  publishedYear: number;
  reviews?: Review[];
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}
