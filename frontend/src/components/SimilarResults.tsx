import {
  Paper,
  Stack,
  Group,
  Title,
  Text,
  CloseButton,
  Loader,
  Center,
  Image,
  Badge,
} from '@mantine/core';
import type { SimilarAsset } from '../types';

type Props = {
  results: SimilarAsset[];
  loading: boolean;
  error: Error | null;
  onClose: () => void;
};

export function SimilarResults({ results, loading, error, onClose }: Props) {
  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Group justify="space-between" mb="sm">
        <Title order={4}>Похожие</Title>
        <CloseButton onClick={onClose} />
      </Group>

      {loading && (
        <Center py="xl">
          <Loader />
        </Center>
      )}

      {error && (
        <Text c="red" size="sm">
          {error.message}
        </Text>
      )}

      {!loading && !error && results.length === 0 && (
        <Text c="dimmed" size="sm">
          Ничего не найдено
        </Text>
      )}

      {!loading && results.length > 0 && (
        <Stack gap="sm">
          {results.map((item) => (
            <Group key={item.id} wrap="nowrap" align="flex-start">
              <Image
                src={item.filePath}
                alt={item.fileName}
                w={60}
                h={60}
                fit="contain"
                radius="sm"
                bg="var(--mantine-color-gray-0)"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text size="sm" fw={500} truncate>
                  {item.fileName}
                </Text>
                <Badge size="xs" variant="light" color="green" mt={4}>
                  {(item.similarity * 100).toFixed(0)}% схожесть
                </Badge>
              </div>
            </Group>
          ))}
        </Stack>
      )}
    </Paper>
  );
}