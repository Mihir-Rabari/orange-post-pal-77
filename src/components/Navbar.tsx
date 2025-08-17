import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, FileText, Home, LinkIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isConnected?: boolean;
  onConnect?: () => void;
}

const Navbar = ({ isConnected = false, onConnect }: NavbarProps) => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-foreground">
              LinkedIn Post Creator
            </Link>
            {isConnected && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <LinkIcon className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            )}
          </div>
          
          <nav className="flex items-center">
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;