
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChallengeProgressContextType {
  progressMap: Record<string, number>;
  updateProgress: (id: string, value: number) => void;
  resetProgress: () => void;
}

const ChallengeProgressContext = createContext<ChallengeProgressContextType | undefined>(undefined);

export const ChallengeProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('challengeProgress');
    if (stored) {
      setProgressMap(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('challengeProgress', JSON.stringify(progressMap));
  }, [progressMap]);

  const updateProgress = (id: string, value: number) => {
    setProgressMap(prev => ({ ...prev, [id]: value }));
  };

  const resetProgress = () => {
    setProgressMap({});
  };

  return (
    <ChallengeProgressContext.Provider value={{ progressMap, updateProgress, resetProgress }}>
      {children}
    </ChallengeProgressContext.Provider>
  );
};

export const useChallengeProgress = () => {
  const context = useContext(ChallengeProgressContext);
  if (!context) {
    throw new Error('useChallengeProgress must be used within a ChallengeProgressProvider');
  }
  return context;
};
