
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Home, Clock, Building, Users, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

interface CycleSegment {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ElementType;
  points: number;
}

const DisasterCycle = () => {
  const navigate = useNavigate();
  const { user, completedChallenge } = useUser();
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  
  const cycleSegments: CycleSegment[] = [
    {
      id: 'preparation',
      name: 'Preparation',
      description: 'Get ready before disasters strike by learning preparation techniques.',
      color: 'bg-preimpact',
      icon: Clock,
      points: 100
    },
    {
      id: 'response',
      name: 'Response',
      description: 'Learn how to respond effectively during emergency situations.',
      color: 'bg-emergency',
      icon: ShieldAlert,
      points: 150
    },
    {
      id: 'restoration',
      name: 'Restoration',
      description: 'Help communities restore essential services after disasters.',
      color: 'bg-restoration',
      icon: CheckCheck,
      points: 125
    },
    {
      id: 'recovery',
      name: 'Recovery',
      description: 'Rebuild and recover from disaster impacts for long-term sustainability.',
      color: 'bg-recovery',
      icon: Home,
      points: 100
    },
    {
      id: 'mitigation',
      name: 'Mitigation',
      description: 'Reduce or prevent future disaster risks through strategic planning.',
      color: 'bg-mitigation',
      icon: Building,
      points: 175
    },
    {
      id: 'capacity',
      name: 'Capacity Building',
      description: 'Develop community resilience and preparedness for future events.',
      color: 'bg-capacity',
      icon: Users,
      points: 200
    },
  ];

  const handleSegmentClick = (id: string) => {
    setActiveSegment(id === activeSegment ? null : id);
  };

  const startChallenge = (id: string) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to start challenges and track your progress.",
        variant: "destructive"
      });
      return;
    }
    
    const segment = cycleSegments.find(seg => seg.id === id);
    if (segment) {
      toast({
        title: "Challenge Started",
        description: `You've started the ${segment.name} challenge!`,
      });
      navigate(`/challenge/${id}`);
    }
  };

  // Check if a segment is completed by the user
  const isSegmentCompleted = (segmentId: string): boolean => {
    if (!user) return false;
    return user.completedChallenges.includes(segmentId);
  };

  // Get segment progress from user data
  const getSegmentProgress = (segmentId: string): number => {
    if (!user) return 0;
    return user.progress[segmentId as keyof typeof user.progress] || 0;
  };

  return (
    <div className="relative mx-auto my-8 max-w-5xl">
      {/* Cycle visual representation */}
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="bg-white rounded-full shadow-lg p-4 relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full">
            {cycleSegments.map((segment) => (
              <div
                key={segment.id}
                className={`${segment.color} rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${activeSegment === segment.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSegmentClick(segment.id)}
              >
                <segment.icon className="h-8 w-8 mb-2 text-white" />
                <h3 className="text-sm font-bold text-center">{segment.name}</h3>
                {isSegmentCompleted(segment.id) && (
                  <div className="mt-1 bg-white/30 rounded-full px-2 py-0.5">
                    <CheckCheck className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Central overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-primary/20">
          <div className="text-center">
            <h3 className="text-sm font-bold">Disaster<br/>Management</h3>
            <p className="text-xs text-gray-500">Click a segment</p>
          </div>
        </div>
      </div>

      {/* Segment details card */}
      {activeSegment && (
        <Card className="mt-8 p-6 animate-fade-in">
          {cycleSegments.filter(segment => segment.id === activeSegment).map(segment => (
            <div key={segment.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`${segment.color} p-3 rounded-lg`}>
                  <segment.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{segment.name}</h3>
                  <p className="text-sm text-muted-foreground">{segment.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Current progress: {getSegmentProgress(segment.id)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isSegmentCompleted(segment.id) ? 'Completed' : 'Not completed'}
                  </p>
                </div>
                <Button onClick={() => startChallenge(segment.id)} className="gap-2">
                  {isSegmentCompleted(segment.id) ? 'Replay Challenge' : 'Start Challenge'} 
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default DisasterCycle;
