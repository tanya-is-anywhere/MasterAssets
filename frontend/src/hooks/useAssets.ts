import { useEffect, useState } from 'react';
import type { Asset } from '../types';
import { mockAssets } from '../mocks/assets';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAssets() {
      setLoading(true);
      setError(null);
      try {
        // TODO: заменить на fetch('/api/v1/assets')
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (!cancelled) {
            console.log('useAssets setAssets:', mockAssets);
          setAssets(mockAssets);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  return { assets, loading, error };
}
