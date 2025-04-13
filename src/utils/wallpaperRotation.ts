
import { format, addDays, parseISO, differenceInDays } from "date-fns";
import { Wallpaper } from "@/types/wallpaper";

// Pool of wallpapers that can be added to the active collection
const wallpaperPool: Omit<Wallpaper, "createdAt">[] = [
  {
    id: "pool-1",
    title: "Forest Mist",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    thumbnailUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format",
    category: "nature",
    tags: ["trees", "mist", "forest"],
    downloadCount: 430,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "pool-2",
    title: "Mountain Summit",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format",
    category: "nature",
    tags: ["mountain", "summit", "landscape"],
    downloadCount: 520,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "pool-3",
    title: "Yellow Lights",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format",
    category: "dark",
    tags: ["lights", "forest", "night"],
    downloadCount: 680,
    isPremium: false,
    requiresAd: false,
  },
  {
    id: "pool-4",
    title: "Desert Sand",
    imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    thumbnailUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=500&auto=format",
    category: "minimal",
    tags: ["desert", "sand", "minimal"],
    downloadCount: 340,
    isPremium: false,
    requiresAd: true,
  },
  {
    id: "pool-5",
    title: "Starry Night",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    thumbnailUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&auto=format",
    category: "dark",
    tags: ["night", "stars", "sky"],
    downloadCount: 950,
    isPremium: false,
    requiresAd: true,
  },
];

// Configuration 
const WALLPAPER_LIFESPAN_DAYS = 7; // How many days before a wallpaper is removed
const NEW_WALLPAPERS_PER_DAY = 1;  // How many new wallpapers to add each day

/**
 * Manages the daily rotation of wallpapers
 * - Removes wallpapers older than WALLPAPER_LIFESPAN_DAYS
 * - Adds NEW_WALLPAPERS_PER_DAY new wallpapers each day
 */
export const getUpdatedWallpapers = (currentWallpapers: Wallpaper[]): Wallpaper[] => {
  const today = new Date();
  const todayString = format(today, "yyyy-MM-dd");
  
  // Filter out wallpapers older than WALLPAPER_LIFESPAN_DAYS days
  const filteredWallpapers = currentWallpapers.filter(wallpaper => {
    const creationDate = parseISO(wallpaper.createdAt);
    const daysDifference = differenceInDays(today, creationDate);
    return daysDifference < WALLPAPER_LIFESPAN_DAYS;
  });

  // Check if we already added a wallpaper today
  const addedTodayCount = filteredWallpapers.filter(w => 
    w.createdAt.startsWith(todayString)).length;
  
  // Add new wallpapers if needed
  if (addedTodayCount < NEW_WALLPAPERS_PER_DAY) {
    const numToAdd = NEW_WALLPAPERS_PER_DAY - addedTodayCount;
    
    // Get random wallpapers from pool that aren't already in our collection
    const existingIds = new Set(filteredWallpapers.map(w => w.id.replace('pool-', '')));
    const availableWallpapers = wallpaperPool.filter(w => !existingIds.has(w.id));
    
    for (let i = 0; i < numToAdd && i < availableWallpapers.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableWallpapers.length);
      const newWallpaper = availableWallpapers.splice(randomIndex, 1)[0];
      
      // Add with today's date
      filteredWallpapers.push({
        ...newWallpaper,
        id: `${newWallpaper.id}-${Date.now()}`, // Ensure unique ID
        createdAt: today.toISOString()
      });
    }
  }

  return filteredWallpapers;
};

/**
 * Initializes wallpaper collection with creation dates if they don't have them
 */
export const initializeWallpapers = (wallpapers: any[]): Wallpaper[] => {
  // Generate dates spread over the past few days for existing wallpapers
  return wallpapers.map((wallpaper, index) => {
    if (!wallpaper.createdAt) {
      // Distribute creation dates over the past few days
      const daysAgo = Math.min(index % WALLPAPER_LIFESPAN_DAYS, WALLPAPER_LIFESPAN_DAYS - 1);
      const creationDate = addDays(new Date(), -daysAgo);
      
      return {
        ...wallpaper,
        createdAt: creationDate.toISOString()
      };
    }
    return wallpaper;
  });
};
