export type ApiError = {
  detail: string;
  status?: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
};