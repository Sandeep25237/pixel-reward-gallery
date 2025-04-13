
import { useState, useEffect } from "react";
import { wallpaperCategories, getWallpapersByCategory } from "@/data/wallpapers";
import Header from "@/components/Header";
import WallpaperGrid from "@/components/WallpaperGrid";
import { AdMobService } from "@/services/admob";

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  const wallpapers = getWallpapersByCategory(currentCategory);

  useEffect(() => {
    // Initialize AdMob when the app starts
    AdMobService.init();
    
    // Preload a rewarded ad
    AdMobService.loadRewardedAd();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        currentCategory={currentCategory} 
        onCategoryChange={setCurrentCategory} 
      />
      
      <main className="container px-4 py-6">
        <WallpaperGrid wallpapers={wallpapers} />
      </main>
    </div>
  );
};

export default Index;
