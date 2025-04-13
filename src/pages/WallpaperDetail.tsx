
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWallpaperById } from "@/data/wallpapers";
import { useToast } from "@/components/ui/use-toast";
import AdButton from "@/components/AdButton";
import { AdMobService } from "@/services/admob";

const WallpaperDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [canDownload, setCanDownload] = useState(false);
  
  const wallpaper = id ? getWallpaperById(id) : undefined;

  useEffect(() => {
    if (!wallpaper) {
      navigate("/");
    }
  }, [wallpaper, navigate]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleDownload = () => {
    // In a real app, you would trigger the actual download here
    toast({
      title: "Wallpaper downloaded!",
      description: "Saved to your device gallery.",
    });
    
    // Reset reward status
    AdMobService.resetReward();
    
    // Update download count (in a real app, this would be updated in the backend)
    console.log(`Downloaded wallpaper: ${wallpaper?.title}`);
  };

  const handleRewardEarned = () => {
    setCanDownload(true);
  };

  if (!wallpaper) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-screen w-full">
        {/* Back button */}
        <div className="absolute left-4 top-8 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg hover:bg-black/50"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Action buttons */}
        <div className="absolute right-4 top-8 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg hover:bg-black/50"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg hover:bg-black/50"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Wallpaper image */}
        <div className="absolute inset-0 bg-muted">
          <img 
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className="h-full w-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>
        
        {/* Bottom info and actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16">
          <h1 className="mb-2 text-2xl font-bold text-white">{wallpaper.title}</h1>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {wallpaper.tags.map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Download button */}
          {wallpaper.requiresAd && !canDownload ? (
            <AdButton onRewardEarned={handleRewardEarned} />
          ) : (
            <Button 
              onClick={handleDownload}
              className="w-full"
              disabled={isLoading}
            >
              <Download className="mr-2 h-4 w-4" /> Download Wallpaper
            </Button>
          )}
          
          <div className="mt-3 text-center text-xs text-white/60">
            {wallpaper.downloadCount} downloads
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;
