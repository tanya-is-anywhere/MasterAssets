export function getErrorStatus(err: unknown): number | undefined {
  if (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as { response?: { status?: unknown } }).response?.status === 'number'
  ) {
    return (err as { response: { status: number } }).response.status;
  }
  return undefined;
}
