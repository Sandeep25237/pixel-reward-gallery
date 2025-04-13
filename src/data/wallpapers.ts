import { Wallpaper, WallpaperCategory } from "@/types/wallpaper";
import { initializeWallpapers } from "@/utils/wallpaperRotation";

export const wallpaperCategories: WallpaperCategory[] = [
  { id: "all", name: "All", count: 20 },
  { id: "nature", name: "Nature", count: 8 },
  { id: "abstract", name: "Abstract", count: 6 },
  { id: "dark", name: "Dark", count: 4 },
  { id: "minimal", name: "Minimal", count: 2 },
];

// Raw wallpaper data without createdAt field
const rawWallpapers = [
  {
    id: "1",
    title: "Mountain Fog",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    thumbnailUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format",
    category: "nature",
    tags: ["mountains", "fog", "landscape"],
    downloadCount: 1240,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "2",
    title: "Ocean Wave",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    thumbnailUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format",
    category: "nature",
    tags: ["ocean", "waves", "sea"],
    downloadCount: 980,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "3",
    title: "Forest Path",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    thumbnailUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format",
    category: "nature",
    tags: ["forest", "trees", "path"],
    downloadCount: 765,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "4",
    title: "Sunlit Forest",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    thumbnailUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=500&auto=format",
    category: "nature",
    tags: ["forest", "sunlight", "trees"],
    downloadCount: 542,
    isPremium: false,
    requiresAd: false,
  },
  {
    id: "5",
    title: "Lakeside View",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format",
    category: "nature",
    tags: ["lake", "mountains", "reflection"],
    downloadCount: 890,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "6",
    title: "Mountain Range",
    imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    thumbnailUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format",
    category: "nature",
    tags: ["mountains", "range", "landscape"],
    downloadCount: 623,
    isPremium: false,
    requiresAd: false,
  },
  {
    id: "7",
    title: "River Valley",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    thumbnailUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format",
    category: "nature",
    tags: ["river", "mountains", "valley"],
    downloadCount: 475,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "8",
    title: "Purple Gradient",
    imageUrl: "https://images.unsplash.com/photo-1557682250-61b2f4e65110",
    thumbnailUrl: "https://images.unsplash.com/photo-1557682250-61b2f4e65110?w=500&auto=format",
    category: "abstract",
    tags: ["gradient", "purple", "abstract"],
    downloadCount: 1089,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "9",
    title: "Liquid Colors",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    thumbnailUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format",
    category: "abstract",
    tags: ["colorful", "abstract", "liquid"],
    downloadCount: 1345,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "10",
    title: "Dark Wave",
    imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031",
    thumbnailUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=500&auto=format",
    category: "dark",
    tags: ["dark", "wave", "abstract"],
    downloadCount: 879,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "11",
    title: "Neon City",
    imageUrl: "https://images.unsplash.com/photo-1558470598-a5dda9640f68",
    thumbnailUrl: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=500&auto=format",
    category: "dark",
    tags: ["neon", "city", "night"],
    downloadCount: 1562,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "12",
    title: "Minimal Lines",
    imageUrl: "https://images.unsplash.com/photo-1621799754526-a0d52c49fad5",
    thumbnailUrl: "https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?w=500&auto=format",
    category: "minimal",
    tags: ["minimal", "lines", "simple"],
    downloadCount: 421,
    isPremium: false,
    requiresAd: false,
  },
];

// Initialize wallpapers with creation dates
export const wallpapers: Wallpaper[] = initializeWallpapers(rawWallpapers);

export const getWallpapersByCategory = (categoryId: string): Wallpaper[] => {
  if (categoryId === "all") return wallpapers;
  return wallpapers.filter(wallpaper => wallpaper.category === categoryId);
};

export const getWallpaperById = (id: string): Wallpaper | undefined => {
  return wallpapers.find(wallpaper => wallpaper.id === id);
};
