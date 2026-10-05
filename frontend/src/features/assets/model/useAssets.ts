import { useCallback, useEffect, useState } from 'react';
import type { Asset } from '../../../entities';
import { getAssets } from '../api';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAssets();
      setAssets(result.items);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load assets'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { assets, loading, error, refresh };
}
