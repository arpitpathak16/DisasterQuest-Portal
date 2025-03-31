
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import CollaborationService from '@/services/CollaborationService';

export interface User {
  id: string;
  name: string;
  isGuest: boolean;
  points: number;
  progress: {
    preparation: number;
    response: number;
    restoration: number;
    recovery: number;
    mitigation: number;
    capacity: number;
  };
  completedChallenges: string[];
  badges: string[];
  joinedAt: Date;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (name: string) => void;
  signInAsGuest: () => void;
  signOut: () => void;
  updateProgress: (category: string, value: number) => void;
  addPoints: (points: number) => void;
  completedChallenge: (challengeId: string, points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Default guest user
const createGuestUser = (): User => ({
  id: `guest-${Math.random().toString(36).substring(2, 9)}`,
  name: 'Guest',
  isGuest: true,
  points: 0,
  progress: {
    preparation: 0,
    response: 0,
    restoration: 0,
    recovery: 0,
    mitigation: 0,
    capacity: 0,
  },
  completedChallenges: [],
  badges: [],
  joinedAt: new Date(),
});

// Create a demo user (for testing purposes)
const createDemoUser = (name: string): User => ({
  id: `user-${Math.random().toString(36).substring(2, 9)}`,
  name,
  isGuest: false,
  points: 0,
  progress: {
    preparation: 0,
    response: 0,
    restoration: 0,
    recovery: 0,
    mitigation: 0,
    capacity: 0,
  },
  completedChallenges: [],
  badges: [],
  joinedAt: new Date(),
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('disasterQuestUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.joinedAt = new Date(parsedUser.joinedAt);
        setUser(parsedUser);
        
        // Update the global leaderboard with this user's data
        CollaborationService.updateLeaderboard(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('disasterQuestUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('disasterQuestUser', JSON.stringify(user));
      
      // Update the global leaderboard with this user's data
      CollaborationService.updateLeaderboard(user);
    }
  }, [user]);

  const signIn = (name: string) => {
    const newUser = createDemoUser(name);
    setUser(newUser);
    toast({
      title: "Welcome to DisasterQuest!",
      description: `You've signed in as ${name}.`,
    });
  };

  const signInAsGuest = () => {
    const guestUser = createGuestUser();
    setUser(guestUser);
    toast({
      title: "Welcome, Guest!",
      description: "You can sign in later to save your progress.",
    });
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('disasterQuestUser');
    toast({
      title: "Signed out",
      description: "You've been signed out successfully.",
    });
  };

  const updateProgress = (category: keyof User['progress'], value: number) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      // Only update if the new value is higher than the current one
      const currentValue = prevUser.progress[category];
      const newValue = Math.max(currentValue, value);
      
      return {
        ...prevUser,
        progress: {
          ...prevUser.progress,
          [category]: newValue,
        }
      };
    });
  };

  const addPoints = (points: number) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        points: prevUser.points + points,
      };
    });

    toast({
      title: "Points Earned!",
      description: `You've earned ${points} points!`,
    });
  };

  const completedChallenge = (challengeId: string, points: number) => {
    if (!user) return;
    
    // Only add points and mark as completed if not already completed
    if (!user.completedChallenges.includes(challengeId)) {
      setUser(prevUser => {
        if (!prevUser) return null;
        
        return {
          ...prevUser,
          points: prevUser.points + points,
          completedChallenges: [...prevUser.completedChallenges, challengeId],
        };
      });

      toast({
        title: "Challenge Completed!",
        description: `You've earned ${points} points!`,
      });
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        signIn, 
        signInAsGuest, 
        signOut, 
        updateProgress, 
        addPoints,
        completedChallenge 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
