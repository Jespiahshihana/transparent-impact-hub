import { Button } from "@/components/ui/button";
import { Heart, User, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

          {isLoggedIn && (
            <>
              <Link to="/ngo-portal">
                <Button variant="ghost" size="sm">
                  NGO Portal
                </Button>
              </Link>
              <Link to="/admin-portal">
                <Button variant="ghost" size="sm">
                  Admin Portal
                </Button>
              </Link>
            </>
          )}
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  Hello, {username}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="ghost" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};