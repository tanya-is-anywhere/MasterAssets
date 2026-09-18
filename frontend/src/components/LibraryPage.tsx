import { useState } from 'react';
import { Grid, Title, Group, Text } from '@mantine/core';
import { AssetGrid } from '../components/AssetGrid';
import { AssetDetailPanel } from '../components/AssetDetailPanel';
import { SimilarResults } from '../components/SimilarResults';
import { useAssets } from '../hooks/useAssets';
import { useSimilarSearch } from '../hooks/useSimilarSearch';
import type { Asset } from '../types';

export function LibraryPage() {
  const { assets, loading, error } = useAssets();
  const {
    results,
    loading: similarLoading,
    error: similarError,
    search,
    reset,
  } = useSimilarSearch();

  const [selected, setSelected] = useState<Asset | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);

  function handleSelect(asset: Asset) {
    setSelected(asset);
    setShowSimilar(false);
    reset();
  }

  async function handleFindSimilar() {
    if (!selected) return;
    setShowSimilar(true);
    await search(selected.id, 5);
  }

  function handleCloseSimilar() {
    setShowSimilar(false);
    reset();
  }

  function handleCloseDetail() {
    setSelected(null);
    setShowSimilar(false);
    reset();
  }

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Библиотека ассетов</Title>
        <Text c="dimmed" size="sm">
          {assets.length} шт.
        </Text>
      </Group>

      {error && (
        <Text c="red" mb="md">
          Ошибка загрузки: {error.message}
        </Text>
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <AssetGrid
            assets={assets}
            selectedId={selected?.id ?? null}
            loading={loading}
            onSelect={handleSelect}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          {showSimilar ? (
            <SimilarResults
              results={results}
              loading={similarLoading}
              error={similarError}
              onClose={handleCloseSimilar}
            />
          ) : (
            <AssetDetailPanel
              asset={selected}
              onClose={handleCloseDetail}
              onFindSimilar={handleFindSimilar}
            />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}