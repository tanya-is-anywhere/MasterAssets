export type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

export type UploadItem = {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  error?: string;
};
