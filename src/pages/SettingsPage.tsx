import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, LinkIcon, Unlink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnectLinkedIn = () => {
    setIsConnected(true);
    toast({
      title: "LinkedIn connected successfully!",
      description: "You can now publish posts directly to your LinkedIn profile.",
    });
  };

  const handleDisconnectLinkedIn = () => {
    setIsConnected(false);
    toast({
      title: "LinkedIn disconnected",
      description: "Your LinkedIn account has been disconnected.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 h-16">
            <Link to="/chat">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* LinkedIn Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LinkIcon className="w-5 h-5 text-orange" />
                <span>LinkedIn Connection</span>
              </CardTitle>
              <CardDescription>
                Manage your LinkedIn account connection to publish posts directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium text-foreground">
                      {isConnected ? 'LinkedIn Account Connected' : 'No LinkedIn Account Connected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isConnected 
                        ? 'john.doe@email.com' 
                        : 'Connect your LinkedIn account to publish posts'
                      }
                    </p>
                  </div>
                  {isConnected && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                  )}
                </div>
                {isConnected ? (
                  <Button 
                    variant="outline" 
                    onClick={handleDisconnectLinkedIn}
                    className="text-destructive hover:text-destructive"
                  >
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="linkedin" onClick={handleConnectLinkedIn}>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Connect LinkedIn
                  </Button>
                )}
              </div>
              
              {isConnected && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ✅ Your LinkedIn account is connected and ready to publish posts. 
                    You can now use the "Post to LinkedIn" button in the chat interface.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and usage information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Posts Created</p>
                  <p className="text-2xl font-bold text-orange">12</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Drafts Saved</p>
                  <p className="text-2xl font-bold text-orange">3</p>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/drafts">
                  <Button variant="outline" className="w-full">
                    View All Drafts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;