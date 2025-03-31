import React, { useState, useEffect } from "react";
import { challenges as staticChallenges } from "@/lib/challenges";
import { challengeQuestions } from "@/lib/questions";
import { useChallengeProgress } from "@/contexts/ChallengeContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Star,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import QRCodeShare from "@/components/QRCodeShare";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

// Challenge metadata will be pulled from staticChallenges

interface ChallengeData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  questions: Question[];
}

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const challengeMeta = staticChallenges.find((c) => c.id === id);

  const questions = challengeQuestions[id] || [];
  const { updateProgress: updateChallengeProgress, progressMap } =
    useChallengeProgress();
  const currentProgress = progressMap[id] || 0;

  if (!challengeMeta) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 text-center text-red-500">
          <h1 className="text-2xl font-bold">Challenge Not Found</h1>
          <p>Sorry, we couldn’t find a challenge with ID: {id}</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { user, completedChallenge, updateProgress } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set start time when challenge loads
    setStartTime(new Date());

    // Simulate loading challenge data from an API
    setLoading(true);
    setTimeout(() => {
      // Mock data for the challenge
      const mockChallenge: ChallengeData = {
        id: id || "unknown",
        title: getChallengeTitle(id),
        description:
          "Test your knowledge about disaster management and learn vital information that could save lives.",
        category: id || "preparation",
        difficulty: "medium",
        points: 100,
        questions: getQuestions(id),
      };

      setChallenge(mockChallenge);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    });
  };

  const handleNext = () => {
    if (currentStep < (challenge?.questions.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setEndTime(new Date());
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (challenge && id) {
      const score = calculateScore();
      const progressValue = Math.round((score / challenge.points) * 100);

      // Update progress for this category
      updateProgress(id as keyof typeof user.progress, progressValue);

      // Mark challenge as completed
      completedChallenge(id, score);

      updateChallengeProgress(id, 100);
      toast({
        title: "Challenge Completed!",
        description: `You've earned ${score} points!`,
      });
    }
    navigate("/dashboard");
  };

  const calculateScore = () => {
    if (!challenge) return 0;

    const correctAnswers = challenge.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const scorePercentage = (correctAnswers / challenge.questions.length) * 100;
    return Math.round((scorePercentage / 100) * challenge.points);
  };

  const calculateProgress = () => {
    if (!challenge) return 0;
    return ((currentStep + 1) / challenge.questions.length) * 100;
  };

  const calculateTimeTaken = () => {
    if (!startTime || !endTime) return "N/A";

    const seconds = Math.floor(
      (endTime.getTime() - startTime.getTime()) / 1000
    );
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading challenge...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Challenge Not Found
              </CardTitle>
              <CardDescription>
                We couldn't find the challenge you're looking for.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                onClick={() => navigate("/challenges")}
                className="w-full">
                Back to Challenges
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = challenge.questions[currentStep];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Challenge Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>

              <QRCodeShare />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {challenge.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {challenge.description}
            </p>

            {!showResults && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    Question {currentStep + 1} of {challenge.questions.length}
                  </span>
                  <span>{calculateProgress()}% complete</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            )}
          </div>

          {/* Quiz Content */}
          {!showResults ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) =>
                    handleAnswerSelect(currentQuestion.id, value)
                  }
                  className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.id}
                        id={`option-${option.id}`}
                      />
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="flex-grow p-3 hover:bg-muted rounded-md cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="gap-2">
                  {currentStep === challenge.questions.length - 1
                    ? "Finish"
                    : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            /* Results Screen */
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto my-4">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                </div>
                <CardTitle className="text-2xl">Challenge Complete!</CardTitle>
                <CardDescription>
                  You've completed the {challenge.title} challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    <span>{calculateScore()} points earned</span>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {Math.round((calculateScore() / challenge.points) * 100)}%
                    accuracy
                  </p>
                  <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Time taken: {calculateTimeTaken()}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Your Answers:</h3>
                  {challenge.questions.map((question) => (
                    <div
                      key={question.id}
                      className="p-4 rounded-lg bg-muted/50">
                      <div className="flex gap-2">
                        {answers[question.id] === question.correctAnswer ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{question.text}</p>
                          <p className="text-sm mt-1">
                            Your answer:
                            <span
                              className={
                                answers[question.id] === question.correctAnswer
                                  ? "text-green-600 font-medium ml-1"
                                  : "text-red-600 font-medium ml-1"
                              }>
                              {question.options.find(
                                (o) => o.id === answers[question.id]
                              )?.text || "Not answered"}
                            </span>
                          </p>
                          {answers[question.id] !== question.correctAnswer && (
                            <p className="text-sm text-green-600 mt-1">
                              Correct answer:
                              <span className="font-medium ml-1">
                                {
                                  question.options.find(
                                    (o) => o.id === question.correctAnswer
                                  )?.text
                                }
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleFinish} className="w-full gap-2">
                  Return to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper function to get questions based on challenge category
function getQuestions(id: string | undefined): Question[] {
  // Default questions for all challenges
  const defaultQuestions: Question[] = [
    {
      id: 1,
      text: "What should be the first priority in any emergency situation?",
      options: [
        { id: "a", text: "Calling for help" },
        { id: "b", text: "Personal safety" },
        { id: "c", text: "Helping others" },
        { id: "d", text: "Documenting the situation" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Which of the following is NOT typically included in a basic emergency kit?",
      options: [
        { id: "a", text: "Water" },
        { id: "b", text: "First aid supplies" },
        { id: "c", text: "Entertainment devices" },
        { id: "d", text: "Non-perishable food" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "How much water should you store per person per day for emergency situations?",
      options: [
        { id: "a", text: "0.5 gallons (2 liters)" },
        { id: "b", text: "1 gallon (4 liters)" },
        { id: "c", text: "2 gallons (8 liters)" },
        { id: "d", text: "3 gallons (12 liters)" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "What is the recommended way to purify water if it might be contaminated?",
      options: [
        { id: "a", text: "Let it stand for 24 hours" },
        { id: "b", text: "Add a few drops of bleach" },
        { id: "c", text: "Boil it for at least one minute" },
        { id: "d", text: "Filter it through cloth" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      text: "Which of these actions should you take during an earthquake?",
      options: [
        { id: "a", text: "Run outside immediately" },
        { id: "b", text: "Stand in a doorway" },
        { id: "c", text: "Drop, cover, and hold on" },
        { id: "d", text: "Get near windows for visibility" },
      ],
      correctAnswer: "c",
    },
  ];

  // Return different questions based on category in the future
  // For now, we'll return the default questions for all categories
  return defaultQuestions;
}

// Helper function to get challenge title based on ID
function getChallengeTitle(id: string | undefined): string {
  switch (id) {
    case "preparation":
      return "Disaster Preparation Quiz";
    case "response":
      return "Emergency Response Challenge";
    case "restoration":
      return "Service Restoration Test";
    case "recovery":
      return "Recovery Planning Exercise";
    case "mitigation":
      return "Risk Mitigation Assessment";
    case "capacity":
      return "Community Capacity Building Quiz";
    default:
      return "Disaster Management Challenge";
  }
}

export default Challenge;
