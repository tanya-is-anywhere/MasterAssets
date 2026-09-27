import { useState } from 'react';
import { findSimilar } from '../api/assets';
import type { SimilarAsset } from '../types';

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
      const data = await findSimilar(assetId, limit);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
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
