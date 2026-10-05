export function getErrorMessage(err: unknown, fallback = 'Произошла ошибка'): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return fallback;
}
