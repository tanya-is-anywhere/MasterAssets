export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU');
}

export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
