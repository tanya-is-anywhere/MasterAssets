export type Asset = {
  id: number;
  file_name: string;
  file_path: string;
  mime_type: string;
  width: number;
  height: number;
  size_bytes: number;
  owner_id: number;
  tags: string[];
  phash: string | null;
  avg_color_rgb: string | null;
  brightness: number | null;
  contrast: number | null;
  aspect_ratio: number | null;
  created_at: string;
  updated_at: string;
};

export type SimilarAsset = Asset & {
  similarity: number;
};
