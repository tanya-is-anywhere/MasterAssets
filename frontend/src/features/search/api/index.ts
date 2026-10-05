import { client } from '../../../shared/api';
import type { SimilarAsset } from '../../../entities';

export async function findSimilar(
  id: number,
  limit = 5,
): Promise<SimilarAsset[]> {
  const { data } = await client.get<SimilarAsset[]>(`/assets/${id}/similar`, {
    params: { limit },
  });
  return data;
}
