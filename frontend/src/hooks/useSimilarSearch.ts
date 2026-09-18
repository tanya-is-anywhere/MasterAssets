import { useState } from 'react';
import type { SimilarAsset } from '../types';
import { mockAssets } from '../mocks/assets';

type SimilarSearchResult = {
  results: SimilarAsset[];
  loading: boolean;
  error: Error | null;
  search: (assetId: number, limit?: number) => Promise<void>;
  reset: () => void;
};

export function useSimilarSearch(): SimilarSearchResult {
  const [results, setResults] = useState<SimilarAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function search(assetId: number, limit = 5): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      // TODO: заменить на fetch(`/api/v1/assets/${assetId}/similar?limit=${limit}`)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const shuffled = [...mockAssets]
        .filter((a) => a.id !== assetId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
        .map((asset, i) => ({
          ...asset,
          similarity: 0.95 - i * 0.05,
        }));

      setResults(shuffled);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  function reset(): void {
    setResults([]);
    setError(null);
  }

  return { results, loading, error, search, reset };
}
