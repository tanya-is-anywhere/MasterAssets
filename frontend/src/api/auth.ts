import { client } from './client';
import type { User } from '../types';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const { data: result } = await client.post<TokenResponse>('/auth/login', data);
  return result;
}

export async function register(data: RegisterRequest): Promise<User> {
  const { data: result } = await client.post<User>('/auth/register', data);
  return result;
}

export async function getMe(): Promise<User> {
  const { data } = await client.get<User>('/auth/me');
  return data;
}