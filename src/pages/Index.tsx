import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-muted to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Create Engaging 
            <span className="text-orange block">LinkedIn Posts</span>
            with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into compelling LinkedIn content with our AI-powered post creator. 
            Generate, edit, and publish posts that engage your professional network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/chat">
              <Button variant="orange" size="lg" className="text-lg px-8 py-6">
                Start Creating Posts
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Connect LinkedIn
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Writing</h3>
              <p className="text-muted-foreground">
                Chat with our AI to generate engaging LinkedIn posts tailored to your ideas and industry.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
              <p className="text-muted-foreground">
                See exactly how your post will look on LinkedIn before publishing with our real-time preview.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Publishing</h3>
              <p className="text-muted-foreground">
                Connect your LinkedIn account and publish your posts directly from our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
