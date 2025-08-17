import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  FileText, 
  Trash2, 
  Edit3, 
  Search, 
  Calendar,
  ThumbsUp,
  MessageSquare,
  Share,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";
import Navbar from "@/components/Navbar";

interface Draft {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  preview: string;
  hasImage: boolean;
  imageUrl?: string;
}

const DraftsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([
    {
      id: '1',
      title: 'AI in the Workplace',
      content: 'Exciting insights about AI transforming the workplace! 🤖\n\nThis technology is reshaping how we work, collaborate, and innovate. Here are my key observations:\n\n• Automation is handling routine tasks\n• AI assists in decision-making processes\n• Human creativity becomes more valuable\n• New skills are emerging as essential\n\nThe future belongs to those who adapt and embrace these changes. How is AI impacting your industry?\n\n#AI #FutureOfWork #Innovation #Technology #DigitalTransformation',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      preview: 'Exciting insights about AI transforming the workplace! 🤖 This technology is reshaping how we work...',
      hasImage: false
    },
    {
      id: '2',
      title: 'Remote Team Collaboration',
      content: 'Remote work has revolutionized team collaboration! 🏠💼\n\nAfter leading distributed teams for 3 years, here are my top strategies for success:\n\n✅ Daily standups keep everyone aligned\n✅ Async communication respects time zones\n✅ Virtual coffee chats build relationships\n✅ Clear documentation prevents confusion\n✅ Flexible schedules boost productivity\n\nThe key? Intentional communication and trust.\n\nWhat collaboration tools have transformed your remote work experience?\n\n#RemoteWork #TeamCollaboration #Leadership #Productivity #WorkFromHome',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16'),
      preview: 'Remote work has revolutionized team collaboration! After leading distributed teams for 3 years...',
      hasImage: false
    },
    {
      id: '3',
      title: 'Career Growth Strategies',
      content: 'Your career growth isn\'t just about climbing the ladder 📈\n\nIt\'s about building a foundation that sustains long-term success. Here\'s what I\'ve learned:\n\n🎯 Focus on impact over titles\n🎯 Build genuine professional relationships\n🎯 Continuously upskill and adapt\n🎯 Seek feedback and act on it\n🎯 Take calculated risks\n\nThe most successful professionals I know didn\'t just wait for opportunities—they created them.\n\nWhat\'s the best career advice you\'ve received?\n\n#CareerGrowth #ProfessionalDevelopment #Leadership #Success #Networking',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-13'),
      preview: 'Your career growth isn\'t just about climbing the ladder. It\'s about building a foundation...',
      hasImage: false
    }
  ]);
  const { toast } = useToast();

  const filteredDrafts = drafts.filter(draft => 
    draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
    toast({
      title: "Draft deleted",
      description: "The draft has been removed successfully.",
    });
  };

  const handleEditDraft = (draftId: string) => {
    toast({
      title: "Opening draft in editor",
      description: "Redirecting to chat interface...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-6 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Drafts</h1>
            <p className="text-muted-foreground">
              {drafts.length} saved draft{drafts.length !== 1 ? 's' : ''} • Manage and edit your LinkedIn post ideas
            </p>
          </div>
          <Link to="/chat">
            <Button variant="orange" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search drafts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Drafts Grid */}
        {filteredDrafts.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? 'No drafts found' : 'No drafts yet'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or create a new draft.' 
                : 'Create your first LinkedIn post draft in the chat interface and save it to see it here.'
              }
            </p>
            <Link to="/chat">
              <Button variant="orange">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Draft
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDrafts.map((draft) => (
              <div key={draft.id} className="bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-shadow duration-200">
                {/* Draft Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                        {draft.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Created {draft.createdAt.toLocaleDateString()}</span>
                        {draft.updatedAt > draft.createdAt && (
                          <>
                            <span>•</span>
                            <span>Updated {draft.updatedAt.toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-orange-muted text-orange border-orange/30">
                      <FileText className="w-3 h-3 mr-1" />
                      Draft
                    </Badge>
                  </div>
                </div>

                {/* LinkedIn Preview */}
                <div className="p-4">
                  <Card className="mb-4">
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profilePlaceholder} alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">John Doe</h4>
                          <p className="text-xs text-muted-foreground">Product Manager • 2m</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm text-foreground line-clamp-4 whitespace-pre-wrap mb-3">
                        {draft.content}
                      </div>
                      
                      {draft.hasImage && draft.imageUrl && (
                        <div className="rounded-md overflow-hidden border border-border mb-3">
                          <img src={draft.imageUrl} alt="Post image" className="w-full h-32 object-cover" />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex space-x-3">
                          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-1">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-1">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-1">
                            <Share className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link to="/chat" className="flex-1">
                      <Button 
                        variant="orange" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleEditDraft(draft.id)}
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftsPage;