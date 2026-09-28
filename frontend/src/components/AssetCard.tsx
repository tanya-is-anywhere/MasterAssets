import { Card, Image, Text, Badge, Group } from '@mantine/core';
import type { Asset } from '../types';

type Props = {
  asset: Asset;
  selected: boolean;
  onSelect: (asset: Asset) => void;
};

export function AssetCard({ asset, selected, onSelect }: Props) {
  return (
    <Card
      withBorder
      padding="sm"
      radius="md"
      onClick={() => onSelect(asset)}
      style={{
        cursor: 'pointer',
        borderColor: selected
          ? 'var(--mantine-color-blue-6)'
          : undefined,
        borderWidth: selected ? 2 : 1,
        animation: 'fadeIn 0.3s ease',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <Card.Section>
        <Image
          src={`/static/${asset.file_path}`}
          alt={asset.file_name}
          height={140}
          fit="contain"
          bg="var(--mantine-color-gray-0)"
        />
      </Card.Section>

      <Text size="sm" fw={500} mt="sm" truncate>
        {asset.file_name}
      </Text>

      <Group gap="xs" mt={4}>
        {asset.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} size="xs" variant="light">
            {tag}
          </Badge>
        ))}
        {asset.tags.length > 2 && (
          <Badge size="xs" variant="light" color="gray">
            +{asset.tags.length - 2}
          </Badge>
        )}
      </Group>
    </Card>
  );
}
