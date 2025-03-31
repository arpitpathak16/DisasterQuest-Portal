
import React, { useState, useEffect } from 'react';
import { QrCode, Copy, Check, Share2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import CollaborationService, { SessionData } from '@/services/CollaborationService';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Generate a unique session ID for collaboration
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const QRCodeShare: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { sessionId: urlSessionId } = useParams<{ sessionId?: string }>();
  
  const [sessionId, setSessionId] = useState(urlSessionId || generateSessionId());
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // Create a URL for the current session that can be shared
  const sessionUrl = `${window.location.origin}/session/${sessionId}`;

  useEffect(() => {
    if (!user) return;
    
    // Join session when dialog opens
    if (open) {
      CollaborationService.joinSession(sessionId, user);
      
      // Set up session data listener
      const handleSessionUpdate = (data: SessionData) => {
        if (data.id === sessionId) {
          setSessionData(data);
        }
      };
      
      CollaborationService.subscribe('session-updated', handleSessionUpdate);
      
      // Get initial session data
      const initialData = CollaborationService.getSession(sessionId);
      if (initialData) {
        setSessionData(initialData);
      }
      
      return () => {
        CollaborationService.unsubscribe('session-updated', handleSessionUpdate);
      };
    }
  }, [open, sessionId, user]);

  // Handle joining a session from URL
  useEffect(() => {
    if (urlSessionId && user) {
      CollaborationService.joinSession(urlSessionId, user);
      setSessionId(urlSessionId);
      
      toast({
        title: "Joined Collaborative Session",
        description: "You've joined a collaborative disaster training session.",
      });
    }
  }, [urlSessionId, user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sessionUrl).then(() => {
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The session link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my DisasterQuest session!',
          text: 'Join my collaborative disaster management training session.',
          url: sessionUrl,
        });
        toast({
          title: "Shared Successfully!",
          description: "Your session has been shared.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <QrCode className="h-4 w-4" />
          Collaborate
          {sessionData && sessionData.participants.length > 1 && (
            <Badge variant="secondary" className="ml-2">
              {sessionData.participants.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Collaborative Session</DialogTitle>
          <DialogDescription>
            Invite others to join your disaster management training. 
            Points and progress will be synchronized across participants.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-2 rounded-lg shadow">
            {/* QR code representation (in a real app, use a QR code library) */}
            <div className="w-48 h-48 bg-black p-4 flex items-center justify-center">
              <QrCode className="w-36 h-36 text-white" />
            </div>
          </div>
          <div className="text-sm text-center font-medium">
            Session ID: {sessionId}
          </div>
          
          {/* Participants */}
          {sessionData && sessionData.participants.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <h4 className="font-medium">Participants ({sessionData.participants.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 bg-muted/50 rounded-md">
                {sessionData.participants.map(participant => (
                  <div key={participant.id} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getInitials(participant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                    {participant.id === user?.id && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1 gap-2" 
              onClick={handleCopyLink}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button 
              className="flex-1 gap-2" 
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeShare;
