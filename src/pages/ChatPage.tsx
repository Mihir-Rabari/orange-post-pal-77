import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Send, LinkIcon, ThumbsUp, MessageSquare, Share, MoreHorizontal, FileText, Upload, ArrowLeft, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface PostData {
  title: string;
  content: string;
  hasImage: boolean;
  imageUrl?: string;
}

const ChatPage = () => {
  const [postTitle, setPostTitle] = useState("New LinkedIn Post");
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm here to help you create engaging LinkedIn posts. What would you like to post about today?",
      timestamp: new Date()
    }
  ]);
  const [currentPost, setCurrentPost] = useState<PostData>({
    title: "AI in the Workplace",
    content: "Share your insights about AI transforming the workplace. What changes have you observed in your industry? 🤖\n\n#AI #FutureOfWork #Innovation #Technology",
    hasImage: false
  });
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Great idea! I'll help you create a LinkedIn post about "${inputValue}". Here's what I've generated for you. Feel free to ask me to modify anything!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);

      // Update post content based on input
      setCurrentPost(prev => ({
        ...prev,
        content: `Exciting insights about ${inputValue}! 🚀\n\nThis is such an important topic in today's landscape. Here are my key takeaways:\n\n• Innovation drives progress\n• Collaboration fuels success\n• Continuous learning is essential\n\nWhat's your experience with this? Would love to hear your thoughts in the comments!\n\n#Innovation #Growth #Learning #Professional`,
      }));
    }, 1000);

    setInputValue("");
  };

  const handlePublishPost = () => {
    if (!isConnected) {
      return; // Dialog will handle this
    }

    toast({
      title: "Post published successfully!",
      description: "Your LinkedIn post has been shared with your network.",
    });
  };

  const handleConnectLinkedIn = () => {
    setIsConnected(true);
    toast({
      title: "LinkedIn connected!",
      description: "You can now publish posts directly to LinkedIn.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved!",
      description: "Your post has been saved to drafts.",
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Image upload",
      description: "Image upload functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/drafts">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-foreground">{currentPost.title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/drafts">
              <Button variant="ghost" size="icon">
                <FileText className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar - Chat Interface */}
        <div className="w-80 bg-background border-r border-border flex flex-col">
          {/* Post Title Input */}
          <div className="p-4 border-b border-border">
            <Input
              placeholder="Post title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-2 max-w-[85%]">
                  {message.type === 'ai' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-orange text-white text-xs">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-orange text-white rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarImage src={profilePlaceholder} alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder="Ask me to create or modify your post..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                variant="orange" 
                size="icon"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Image Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-3 text-center">
              <Button 
                variant="ghost" 
                onClick={handleImageUpload}
                className="w-full flex items-center justify-center space-x-2 text-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Add Image</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Post Preview */}
        <div className="flex-1 bg-background flex flex-col">
          {/* Preview Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">POST PREVIEW</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  EDIT
                </Button>
                {isConnected ? (
                  <Button 
                    variant="linkedin" 
                    size="sm"
                    onClick={handlePublishPost}
                  >
                    PUBLISH
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="linkedin" size="sm">
                        PUBLISH
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect LinkedIn Account</DialogTitle>
                        <DialogDescription>
                          Connect your LinkedIn account to publish this post directly to your profile.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="linkedin" 
                          className="w-full"
                          onClick={handleConnectLinkedIn}
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Connect LinkedIn
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                          Save as Draft
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profilePlaceholder} alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Product Manager at TechCorp • 1st</p>
                      <p className="text-xs text-muted-foreground">2m • 🌍</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="whitespace-pre-wrap text-sm text-foreground mb-4">
                    {currentPost.content}
                  </div>
                  
                  {currentPost.hasImage && currentPost.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-border mb-4">
                      <img src={currentPost.imageUrl} alt="Post image" className="w-full h-48 object-cover" />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Action Buttons */}
              <div className="mt-6 flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                {isConnected ? (
                  <Button 
                    variant="linkedin" 
                    className="flex-1"
                    onClick={handlePublishPost}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Post to LinkedIn
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="linkedin" className="flex-1">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Post to LinkedIn
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect LinkedIn Account</DialogTitle>
                        <DialogDescription>
                          Connect your LinkedIn account to publish this post directly to your profile.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="linkedin" 
                          className="w-full"
                          onClick={handleConnectLinkedIn}
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Connect LinkedIn
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                          Save as Draft
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;