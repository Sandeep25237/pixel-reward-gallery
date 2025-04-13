
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Wallpaper } from "@/types/wallpaper";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
}

const WallpaperGrid = ({ wallpapers }: WallpaperGridProps) => {
  const isMobile = useIsMobile();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="wallpaper-grid">
      {wallpapers.map((wallpaper) => (
        <Link
          to={`/wallpaper/${wallpaper.id}`}
          key={wallpaper.id}
          className={cn(
            "wallpaper-card animate-fade-in", 
            !loadedImages[wallpaper.id] && "bg-muted"
          )}
        >
          <img
            src={wallpaper.thumbnailUrl}
            alt={wallpaper.title}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              loadedImages[wallpaper.id] ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => handleImageLoad(wallpaper.id)}
          />
          <div className="wallpaper-overlay">
            <h3 className="mb-1 text-base font-medium">{wallpaper.title}</h3>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <span className="flex items-center">
                <Download className="mr-1 h-3 w-3" />
                {wallpaper.downloadCount}
              </span>
              {wallpaper.requiresAd && (
                <span className="rounded bg-primary/80 px-1.5 py-0.5 text-xs">Ad</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WallpaperGrid;
