export type Asset = {
  id: number;
  fileName: string;
  filePath: string;
  mimeType: string;
  width: number;
  height: number;
  sizeBytes: number;
  tags: string[];
  createdAt: string;
};

export type SimilarAsset = Asset & {
  similarity: number; // 0..1, косинусная близость
};