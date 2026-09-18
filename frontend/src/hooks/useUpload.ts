import { useState } from 'react';
import type { UploadItem } from '../types';

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
];

export function useUpload() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);

  function addFiles(files: File[]): void {
    const newItems: UploadItem[] = files.map((file) => {
      const error = validate(file);
      return {
        id: crypto.randomUUID(),
        file,
        status: error ? 'error' : 'pending',
        progress: 0,
        error,
      };
    });

    setItems((prev) => [...prev, ...newItems]);
  }

  function removeItem(id: string): void {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearAll(): void {
    setItems([]);
  }

  async function uploadAll(): Promise<void> {
    const pending = items.filter((item) => item.status === 'pending');
    if (pending.length === 0) return;

    setUploading(true);

    for (const item of pending) {
      await uploadOne(item.id);
    }

    setUploading(false);
  }

  async function uploadOne(id: string): Promise<void> {
    updateItem(id, { status: 'uploading', progress: 0 });

    try {
      // TODO: заменить на реальный fetch с FormData
      // const form = new FormData();
      // form.append('file', item.file);
      // await client.post('/assets/upload', form, { onUploadProgress: ... });

      // Имитация прогресса
      for (let p = 10; p <= 100; p += 10) {
        await new Promise((r) => setTimeout(r, 100));
        updateItem(id, { progress: p });
      }

      updateItem(id, { status: 'success', progress: 100 });
    } catch (err) {
      updateItem(id, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Ошибка загрузки',
      });
    }
  }

  function updateItem(id: string, patch: Partial<UploadItem>): void {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  return {
    items,
    uploading,
    addFiles,
    removeItem,
    clearAll,
    uploadAll,
    uploadOne,
  };
}

function validate(file: File): string | undefined {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Неподдерживаемый формат: ${file.type || 'неизвестен'}`;
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `Файл больше ${MAX_SIZE_MB} МБ`;
  }
  return undefined;
}