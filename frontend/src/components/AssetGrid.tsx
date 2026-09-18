import { SimpleGrid, Center, Loader, Text } from '@mantine/core';
import { AssetCard } from './AssetCard';
import type { Asset } from '../types';

type Props = {
  assets: Asset[];
  selectedId: number | null;
  loading: boolean;
  onSelect: (asset: Asset) => void;
};

export function AssetGrid({ assets, selectedId, loading, onSelect }: Props) {
  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (assets.length === 0) {
    return (
      <Center py="xl">
        <Text c="dimmed">Библиотека пуста</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
      spacing="md"
    >
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          selected={asset.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </SimpleGrid>
  );
}
