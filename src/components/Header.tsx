import { Button } from "@/components/ui/button";
import { Heart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 gradient-hero rounded-md flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">TrustFund</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link to="/explore">
            <Button variant="ghost" size="sm">
              Explore Campaigns
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="ghost" size="sm">
              How it Works
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <Button variant="hero" size="sm">
            Start Campaign
          </Button>
        </nav>
      </div>
    </header>
  );
};