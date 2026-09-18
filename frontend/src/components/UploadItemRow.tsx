import {
  Group,
  Text,
  Progress,
  CloseButton,
  Badge,
} from '@mantine/core';
import type { UploadItem } from '../types';

type Props = {
  item: UploadItem;
  onRemove: (id: string) => void;
  onUpload?: (id: string) => void;
};

export function UploadItemRow({ item, onRemove, onUpload }: Props) {
  const sizeKb = (item.file.size / 1024).toFixed(1);

  return (
    <Group wrap="nowrap" align="flex-start" gap="md" py="xs">
      <div style={{ flex: 1, minWidth: 0 }}>
        <Group gap="xs" wrap="nowrap">
          <Text size="sm" fw={500} truncate>
            {item.file.name}
          </Text>
          <Badge
            size="xs"
            variant="light"
            color={
              item.status === 'success'
                ? 'green'
                : item.status === 'error'
                ? 'red'
                : item.status === 'uploading'
                ? 'blue'
                : 'gray'
            }
          >
            {item.status === 'pending' && 'Ожидает'}
            {item.status === 'uploading' && `${item.progress}%`}
            {item.status === 'success' && 'Готово'}
            {item.status === 'error' && 'Ошибка'}
          </Badge>
        </Group>

        <Text size="xs" c="dimmed">
          {sizeKb} КБ
        </Text>

        {item.error && (
          <Text size="xs" c="red" mt={4}>
            {item.error}
          </Text>
        )}

        {item.status === 'uploading' && (
          <Progress value={item.progress} size="xs" mt="xs" animated />
        )}

        {item.status === 'pending' && onUpload && (
          <Text
            size="xs"
            c="blue"
            mt={4}
            style={{ cursor: 'pointer' }}
            onClick={() => onUpload(item.id)}
          >
            Загрузить только этот
          </Text>
        )}
      </div>

      <CloseButton onClick={() => onRemove(item.id)} />
    </Group>
  );
}