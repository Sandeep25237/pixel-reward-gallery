
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { wallpaperCategories } from "@/data/wallpapers";

interface HeaderProps {
  currentCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const Header = ({ currentCategory, onCategoryChange }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px]">
              <nav className="mt-8 flex flex-col gap-2">
                {wallpaperCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={currentCategory === category.id ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => onCategoryChange(category.id)}
                  >
                    {category.name}
                    <span className="ml-2 text-xs text-muted-foreground">({category.count})</span>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl font-bold">
            PixelWall
          </Link>
        </div>
        
        <nav className="hidden md:flex md:items-center md:gap-1">
          {wallpaperCategories.map((category) => (
            <Button
              key={category.id}
              variant={currentCategory === category.id ? "default" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between bg-background px-4">
              <Input 
                className="h-10 flex-grow" 
                placeholder="Search wallpapers..." 
                autoFocus 
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
