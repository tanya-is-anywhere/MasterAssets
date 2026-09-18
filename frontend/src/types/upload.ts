export type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

export type UploadItem = {
  id: string;              // уникальный id для React key
  file: File;
  status: UploadStatus;
  progress: number;        // 0..100
  error?: string;
};