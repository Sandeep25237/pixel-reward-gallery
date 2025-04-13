
// AdMob integration with real AdMob SDK

// AdMob unit IDs - replace these with your actual AdMob unit IDs
const ADMOB_APP_ID = "ca-app-pub-XXXXXXXXXXXXXXXX~NNNNNNNNNN"; // Your AdMob App ID
const REWARDED_AD_UNIT_ID = "ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN"; // Your Rewarded Ad Unit ID

// Track ad state
let isAdLoaded = false;
let isRewarded = false;

export const AdMobService = {
  // Initialize AdMob SDK
  init: async (): Promise<void> => {
    console.log("Initializing AdMob SDK...");
    
    // Check if running in a mobile environment with AdMob available
    if (typeof window !== 'undefined' && window.admob) {
      try {
        await window.admob.start({
          appId: ADMOB_APP_ID
        });
        console.log("AdMob SDK initialized with real App ID");
      } catch (error) {
        console.error("AdMob initialization error:", error);
        // Fallback to mock implementation if initialization fails
      }
    } else {
      console.log("AdMob SDK not available, using mock implementation");
    }
    
    return Promise.resolve();
  },

  // Load rewarded video ad
  loadRewardedAd: async (): Promise<void> => {
    console.log("Loading rewarded video ad...");
    
    if (typeof window !== 'undefined' && window.admob) {
      try {
        // Create and load a rewarded ad
        await window.admob.rewarded.load({
          adUnitId: REWARDED_AD_UNIT_ID
        });
        isAdLoaded = true;
        console.log("Rewarded ad loaded successfully");
      } catch (error) {
        console.error("Error loading rewarded ad:", error);
        // Fallback to mock implementation
        setTimeout(() => {
          isAdLoaded = true;
          console.log("Mock rewarded ad loaded successfully");
        }, 1500);
      }
    } else {
      // Mock implementation for development/testing
      setTimeout(() => {
        isAdLoaded = true;
        console.log("Mock rewarded ad loaded successfully");
      }, 1500);
    }
    
    return Promise.resolve();
  },

  // Show rewarded video ad
  showRewardedAd: async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!isAdLoaded) {
        console.log("Ad not loaded yet, loading now...");
        AdMobService.loadRewardedAd().then(() => {
          AdMobService.showRewardedAd().then(resolve).catch(reject);
        });
        return;
      }

      console.log("Showing rewarded video ad...");
      
      if (typeof window !== 'undefined' && window.admob) {
        try {
          // Set up reward event listener
          const rewardHandler = (reward: any) => {
            console.log("User earned reward!", reward);
            isRewarded = true;
            isAdLoaded = false; // Ad is consumed
            window.admob.rewarded.removeEventListener('reward', rewardHandler);
            resolve(true);
          };
          
          // Set up ad closed event listener
          const closeHandler = () => {
            console.log("Ad was closed");
            isAdLoaded = false; // Ad is consumed
            window.admob.rewarded.removeEventListener('close', closeHandler);
            // If reward wasn't given, user might have closed early
            if (!isRewarded) {
              resolve(false);
            }
          };
          
          // Add event listeners
          window.admob.rewarded.addEventListener('reward', rewardHandler);
          window.admob.rewarded.addEventListener('close', closeHandler);
          
          // Show the ad
          window.admob.rewarded.show().catch((error: any) => {
            console.error("Error showing ad:", error);
            window.admob.rewarded.removeEventListener('reward', rewardHandler);
            window.admob.rewarded.removeEventListener('close', closeHandler);
            reject(error);
          });
        } catch (error) {
          console.error("Error with AdMob rewarded ad:", error);
          
          // Fallback to mock implementation
          setTimeout(() => {
            isRewarded = true;
            isAdLoaded = false; // Ad is consumed
            console.log("Mock user earned reward!");
            resolve(true);
          }, 2000);
        }
      } else {
        // Mock implementation for development/testing
        setTimeout(() => {
          isRewarded = true;
          isAdLoaded = false; // Ad is consumed
          console.log("Mock user earned reward!");
          resolve(true);
        }, 2000);
      }
    });
  },

  // Check if user earned a reward
  isRewarded: (): boolean => {
    return isRewarded;
  },

  // Reset reward status (call after giving the user their reward)
  resetReward: (): void => {
    isRewarded = false;
  }
};

// Add TypeScript interface declaration for the window object
declare global {
  interface Window {
    admob?: {
      start: (config: { appId: string }) => Promise<void>;
      rewarded: {
        load: (config: { adUnitId: string }) => Promise<void>;
        show: () => Promise<void>;
        addEventListener: (event: string, callback: (data?: any) => void) => void;
        removeEventListener: (event: string, callback: (data?: any) => void) => void;
      };
    };
  }
}
