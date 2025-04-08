import React, { useState, useEffect } from "react";
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
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { Timer, CheckCircle, XCircle, Trophy } from "lucide-react";
import { challengeQuestions } from "@/lib/questions";

const Quiz = () => {
  const { segmentId } = useParams<{ segmentId: string }>();
  const navigate = useNavigate();
  const { user, addPoints, updateProgress } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [bonusPoints, setBonusPoints] = useState(0);

  // Get questions for the selected segment
  const segmentQuestions =
    challengeQuestions[segmentId as keyof typeof challengeQuestions] || [];

  // If no questions for this segment, use default questions from any category
  const quizQuestions =
    segmentQuestions.length > 0
      ? segmentQuestions.slice(0, 5)
      : Object.values(challengeQuestions).flat().slice(0, 5);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (quizCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);

  // Calculate bonus points based on time left
  const calculateBonusPoints = () => {
    if (timeLeft >= 25) return 50; // 5 seconds or less
    if (timeLeft >= 20) return 40; // 10 seconds or less
    if (timeLeft >= 15) return 30; // 15 seconds or less
    if (timeLeft >= 10) return 20; // 20 seconds or less
    if (timeLeft >= 5) return 10; // 25 seconds or less
    return 0; // No bonus
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Wait a moment before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        const bonus = calculateBonusPoints();
        setBonusPoints(bonus);

        // Add points to user
        const basePoints = score * 20; // 20 points per correct answer
        const totalPoints = basePoints + bonus;

        addPoints(totalPoints);

        // Update progress for this segment
        const progressValue = Math.min(
          100,
          (score / quizQuestions.length) * 100
        );
        updateProgress(segmentId as keyof typeof user.progress, progressValue);

        toast({
          title: "Quiz Completed!",
          description: `You earned ${basePoints} points + ${bonus} bonus points!`,
        });
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;

    setIsAnswered(true);

    // Wait a moment before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(30); // Reset timer for next question
      } else {
        // Quiz completed
        setQuizCompleted(true);

        // Add points to user
        const basePoints = score * 20; // 20 points per correct answer
        addPoints(basePoints);

        // Update progress for this segment
        const progressValue = Math.min(
          100,
          (score / quizQuestions.length) * 100
        );
        updateProgress(segmentId as keyof typeof user.progress, progressValue);

        toast({
          title: "Quiz Completed!",
          description: `You earned ${basePoints} points!`,
        });
      }
    }, 1500);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setBonusPoints(0);
  };

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Not Available</CardTitle>
              <CardDescription>
                There are no questions available for this segment.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of{" "}
                    {quizQuestions.length}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    <span className="font-medium">{timeLeft}s</span>
                  </div>
                </div>
                <CardDescription>
                  Answer correctly to earn points. The faster you answer, the
                  more bonus points you'll get!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {currentQuestion.text}
                  </h3>
                </div>

                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={handleAnswerSelect}
                  disabled={isAnswered}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 p-3 rounded-lg border ${
                          isAnswered
                            ? option.id === currentQuestion.correctAnswer
                              ? "bg-green-50 border-green-200"
                              : selectedAnswer === option.id
                              ? "bg-red-50 border-red-200"
                              : "bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}>
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                        />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="flex-grow cursor-pointer">
                          {option.text}
                        </Label>
                        {isAnswered && (
                          <div className="ml-2">
                            {option.id === currentQuestion.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : selectedAnswer === option.id ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <Progress value={(timeLeft / 30) * 100} className="h-2" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>
                  Great job! You've completed the quiz.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="text-muted-foreground">Correct Answers</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{score * 20}</p>
                    <p className="text-sm text-muted-foreground">Base Points</p>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{bonusPoints}</p>
                    <p className="text-sm text-muted-foreground">
                      Bonus Points
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">
                    {score * 20 + bonusPoints}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Points Earned
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleRestartQuiz}>
                  Try Again
                </Button>
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
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

export default Quiz;
