
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AdMobService } from "@/services/admob";

interface AdButtonProps {
  onRewardEarned: () => void;
}

const AdButton = ({ onRewardEarned }: AdButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWatchAd = async () => {
    setIsLoading(true);
    
    try {
      // Initialize AdMob if needed
      await AdMobService.init();
      
      // Show the rewarded ad
      const success = await AdMobService.showRewardedAd();
      
      if (success) {
        toast({
          title: "Thank you for watching!",
          description: "You can now download this wallpaper.",
        });
        onRewardEarned();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load the ad. Please try again.",
        variant: "destructive",
      });
      console.error("Ad error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleWatchAd} 
      disabled={isLoading}
      className="mt-2 w-full"
    >
      {isLoading ? (
        "Loading Ad..."
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" /> Watch Ad to Download
        </>
      )}
    </Button>
  );
};

export default AdButton;
