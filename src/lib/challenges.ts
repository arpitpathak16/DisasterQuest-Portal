
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const challenges: Challenge[] = [
  {
    id: 'emergency-kit',
    title: 'Build an Emergency Kit',
    description: 'Learn what items to include in your emergency kit for different types of disasters.',
    category: 'Preparedness',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 'fire-escape-plan',
    title: 'Create a Fire Escape Plan',
    description: 'Understand how to create an effective fire escape plan for your home or school.',
    category: 'Preparedness',
    difficulty: 'medium',
    points: 20,
  },
  {
    id: 'flood-response',
    title: 'Responding to Floods',
    description: 'Identify the steps to take during a flood to stay safe and help others.',
    category: 'Response',
    difficulty: 'hard',
    points: 30,
  }
];
