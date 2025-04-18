
export interface Wallpaper {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  downloadCount: number;
  isPremium: boolean;
  requiresAd: boolean;
  createdAt: string; // ISO string date format
}

export type WallpaperCategory = {
  id: string;
  name: string;
  count: number;
};
