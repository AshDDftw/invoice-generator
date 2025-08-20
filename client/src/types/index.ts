export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  name: string;
  quantity: number;
  rate: number;
  total?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ProductState {
  products: Product[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}