import { client } from '../../../shared/api';
import type { Asset } from '../../../entities/asset';

export type AssetListResponse = {
  items: Asset[];
  total: number;
  page: number;
  page_size: number;
};

export async function getAssets(
  page = 1,
  pageSize = 50,
): Promise<AssetListResponse> {
  const { data } = await client.get<AssetListResponse>('/assets', {
    params: { page, page_size: pageSize },
  });
  return data;
}

export async function uploadAsset(file: File): Promise<Asset> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await client.post<Asset>('/assets/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteAsset(id: number): Promise<void> {
  await client.delete(`/assets/${id}`);
}

export async function updateAsset(
  id: number,
  data: { file_name?: string; tags?: string[] },
): Promise<Asset> {
  const { data: result } = await client.patch<Asset>(`/assets/${id}`, data);
  return result;
}