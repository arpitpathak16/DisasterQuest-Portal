
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ChallengeCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  progress: number;
  onStart: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'preparation':
      return 'bg-preimpact text-white';
    case 'response':
      return 'bg-emergency text-white';
    case 'restoration':
      return 'bg-restoration text-white';
    case 'recovery':
      return 'bg-recovery text-black';
    case 'mitigation':
      return 'bg-mitigation text-black';
    case 'capacity':
      return 'bg-capacity text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  category,
  difficulty,
  points,
  progress,
  onStart,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{points}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-1">
          <Badge variant="outline" className={getCategoryColor(category)}>
            {category}
          </Badge>
          <Badge variant="outline" className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button onClick={onStart} className="w-full">
          {progress === 0 ? 'Start Challenge' : progress === 100 ? 'Completed' : 'Continue'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
