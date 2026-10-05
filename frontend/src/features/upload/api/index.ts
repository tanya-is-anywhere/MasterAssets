import { client } from '../../../shared/api';
import type { Asset } from '../../../entities';

export async function uploadAsset(file: File): Promise<Asset> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await client.post<Asset>('/assets/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
