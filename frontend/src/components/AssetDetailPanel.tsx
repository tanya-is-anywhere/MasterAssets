import {
  Paper,
  Stack,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Divider,
  CloseButton,
} from '@mantine/core';
import type { Asset } from '../types';

type Props = {
  asset: Asset | null;
  onClose: () => void;
  onFindSimilar: () => void;
};

export function AssetDetailPanel({ asset, onClose, onFindSimilar }: Props) {
  if (!asset) {
    return (
      <Paper withBorder p="md" radius="md" h="100%">
        <Text c="dimmed" ta="center" mt="xl">
          Выберите ассет из сетки
        </Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Group justify="space-between" mb="sm">
        <Title order={4}>Детали</Title>
        <CloseButton onClick={onClose} />
      </Group>

      <Image
        src={asset.filePath}
        alt={asset.fileName}
        fit="contain"
        h={200}
        bg="var(--mantine-color-gray-0)"
        radius="sm"
      />

      <Stack gap="xs" mt="md">
        <Text fw={500} truncate>
          {asset.fileName}
        </Text>

        <Group gap="xs">
          {asset.tags.map((tag) => (
            <Badge key={tag} size="sm" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>

        <Divider my="sm" />

        <Text size="sm" c="dimmed">
          {asset.width} × {asset.height} px
        </Text>
        <Text size="sm" c="dimmed">
          {(asset.sizeBytes / 1024).toFixed(1)} КБ
        </Text>
        <Text size="sm" c="dimmed">
          {new Date(asset.createdAt).toLocaleDateString('ru-RU')}
        </Text>

        <Button fullWidth mt="md" onClick={onFindSimilar}>
          Найти похожие
        </Button>
      </Stack>
    </Paper>
  );
}