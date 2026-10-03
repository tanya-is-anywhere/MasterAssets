import { useState } from 'react';
import { Button, Grid, Group, Modal, Text, Title } from '@mantine/core';
import { AssetGrid } from '../components/AssetGrid';
import { AssetDetailPanel } from '../components/AssetDetailPanel';
import { SimilarResults } from '../components/SimilarResults';
import { useAssets } from '../hooks/useAssets';
import { useSimilarSearch } from '../hooks/useSimilarSearch';
import { deleteAsset } from '../api/assets';
import type { Asset } from '../types';

export function LibraryPage() {
  const { assets, loading, error, refresh } = useAssets();
  const {
    results,
    loading: similarLoading,
    error: similarError,
    search,
    reset,
  } = useSimilarSearch();

  const [selected, setSelected] = useState<Asset | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  async function handleDelete() {
    if (!selected) return;
    setDeleteError(null);
    try {
      await deleteAsset(selected.id);
      setSelected(null);
      setShowSimilar(false);
      setConfirmOpen(false);
      await refresh();
    } catch {
      setDeleteError('Не удалось удалить ассет');
    }
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

      {deleteError && (
        <Text c="red" mb="md">
          {deleteError}
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
              onDelete={() => setConfirmOpen(true)}
            />
          )}
        </Grid.Col>
      </Grid>

      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Удалить ассет?"
      >
        <Text>Действие необратимо.</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setConfirmOpen(false)}>
            Отмена
          </Button>
          <Button color="red" onClick={handleDelete}>
            Удалить
          </Button>
        </Group>
      </Modal>
    </>
  );
}