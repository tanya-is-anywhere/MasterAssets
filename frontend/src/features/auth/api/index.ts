import { client } from '../../../shared/api';
import type { User } from '../../../entities';

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

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
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

export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  await client.post('/auth/change-password', data);
}
