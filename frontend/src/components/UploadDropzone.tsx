import { Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

type Props = {
  onDrop: (files: File[]) => void;
  disabled?: boolean;
};

export function UploadDropzone({ onDrop, disabled }: Props) {
  return (
    <Dropzone
      onDrop={onDrop}
      onReject={(files) => console.warn('Отклонено:', files)}
      maxSize={10 * 1024 ** 2}
      accept={['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']}
      disabled={disabled}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <div>
          <Text size="xl" inline>
            Перетащите файлы сюда
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Или кликните, чтобы выбрать. PNG, JPEG, WebP, SVG до 10 МБ.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}