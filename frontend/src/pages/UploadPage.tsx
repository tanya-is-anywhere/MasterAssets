import {
  Container,
  Title,
  Button,
  Group,
  Stack,
  Paper,
  Text,
  Divider,
} from '@mantine/core';
import { UploadDropzone } from '../components/UploadDropzone';
import { UploadItemRow } from '../components/UploadItemRow';
import { useUpload } from '../hooks/useUpload';

export function UploadPage() {
  const {
    items,
    uploading,
    addFiles,
    removeItem,
    clearAll,
    uploadAll,
    uploadOne,
  } = useUpload();

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const successCount = items.filter((i) => i.status === 'success').length;

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="md">
        Загрузка ассетов
      </Title>

      <UploadDropzone
        onDrop={addFiles}
        disabled={uploading}
      />

      {items.length > 0 && (
        <Paper withBorder p="md" radius="md" mt="xl">
          <Group justify="space-between" mb="sm">
            <Text fw={500}>
              Файлы ({items.length})
              {successCount > 0 && ` · загружено: ${successCount}`}
            </Text>
            <Group gap="xs">
              <Button
                variant="subtle"
                size="xs"
                onClick={clearAll}
                disabled={uploading}
              >
                Очистить
              </Button>
              <Button
                size="xs"
                onClick={uploadAll}
                loading={uploading}
                disabled={pendingCount === 0}
              >
                Загрузить все ({pendingCount})
              </Button>
            </Group>
          </Group>

          <Divider mb="xs" />

          <Stack gap={0}>
            {items.map((item) => (
              <UploadItemRow
                key={item.id}
                item={item}
                onRemove={removeItem}
                onUpload={uploadOne}
              />
            ))}
          </Stack>
        </Paper>
      )}
    </Container>
  );
}