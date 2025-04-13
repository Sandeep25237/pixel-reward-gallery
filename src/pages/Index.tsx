
import { useState, useEffect } from "react";
import { wallpaperCategories, getWallpapersByCategory, wallpapers } from "@/data/wallpapers";
import { getUpdatedWallpapers } from "@/utils/wallpaperRotation";
import Header from "@/components/Header";
import WallpaperGrid from "@/components/WallpaperGrid";
import { AdMobService } from "@/services/admob";
import { useToast } from "@/components/ui/use-toast";
import { Wallpaper } from "@/types/wallpaper";

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [activeWallpapers, setActiveWallpapers] = useState<Wallpaper[]>(wallpapers);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize AdMob when the app starts
    AdMobService.init();
    
    // Preload a rewarded ad
    AdMobService.loadRewardedAd();
    
    // Check for wallpaper updates
    const updatedWallpapers = getUpdatedWallpapers(activeWallpapers);
    
    // If we have new wallpapers, update state and show a notification
    if (updatedWallpapers.length !== activeWallpapers.length) {
      setActiveWallpapers(updatedWallpapers);
      
      const diff = updatedWallpapers.length - activeWallpapers.length;
      if (diff > 0) {
        toast({
          title: "New wallpapers available!",
          description: `${diff} new wallpaper${diff > 1 ? 's' : ''} added to your collection.`,
        });
      }
    }
    
    // Run this check daily
    const checkInterval = setInterval(() => {
      const updated = getUpdatedWallpapers(activeWallpapers);
      setActiveWallpapers(updated);
    }, 86400000); // Check once per day (in milliseconds)
    
    // Clean up interval on component unmount
    return () => clearInterval(checkInterval);
  }, []);

  // Filter wallpapers by current category
  const displayWallpapers = currentCategory === "all" 
    ? activeWallpapers 
    : activeWallpapers.filter(wallpaper => wallpaper.category === currentCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        currentCategory={currentCategory} 
        onCategoryChange={setCurrentCategory} 
      />
      
      <main className="container px-4 py-6">
        <WallpaperGrid wallpapers={displayWallpapers} />
      </main>
    </div>
  );
};

export default Index;
