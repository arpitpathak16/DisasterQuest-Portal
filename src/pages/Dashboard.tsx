import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisasterCycle from "@/components/DisasterCycle";
import UserProgress from "@/components/UserProgress";
import SpinWheel from "@/components/SpinWheel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Award, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import CollaborationService, {
  LeaderboardEntry,
} from "@/services/CollaborationService";
import { challenges } from "@/lib/challenges";
import { challengeQuestions } from "@/lib/questions";

// Define the segments for the spin wheel
const wheelSegments = [
  { id: "preparation", name: "Preparation", color: "#64b5f6" }, // Blue
  { id: "response", name: "Response", color: "#ef5350" }, // Red
  { id: "restoration", name: "Restoration", color: "#9c27b0" }, // Purple
  { id: "recovery", name: "Recovery", color: "#aed581" }, // Green
  { id: "mitigation", name: "Mitigation", color: "#ce93d8" }, // Pink
  { id: "capacity-building", name: "Capacity Building", color: "#9575cd" }, // Violet
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );

  // Update daily challenges to use questions from questions.ts
  const getDailyChallenges = () => {
    // Extract keys from challengeQuestions to represent different segments
    const segments = Object.keys(challengeQuestions);
    // Shuffle the segments array
    const shuffled = segments.sort(() => 0.5 - Math.random());
    // Return the first 2 segments as daily challenges
    return shuffled.slice(0, 2).map((segment) => ({
      id: segment,
      title: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      description: `Complete the ${segment.replace(
        /-/g,
        " "
      )} challenge to earn points!`,
      points: 50, // Example points value
    }));
  };

  // Use the updated dailyChallenges logic
  const dailyChallenges = getDailyChallenges();

  useEffect(() => {
    // Get initial leaderboard data
    const data = CollaborationService.getLeaderboard(false);
    setLeaderboardData(data);

    // Set up subscription for leaderboard updates
    const handleLeaderboardUpdate = (data: LeaderboardEntry[]) => {
      setLeaderboardData(data);
    };

    CollaborationService.subscribe(
      "leaderboard-updated",
      handleLeaderboardUpdate
    );

    return () => {
      CollaborationService.unsubscribe(
        "leaderboard-updated",
        handleLeaderboardUpdate
      );
    };
  }, []);

  // Get top 3 leaderboard entries
  const getTopThree = () => {
    return leaderboardData.slice(0, 3);
  };

  // Find current user's rank
  const getUserRank = () => {
    if (!user) return null;

    const userEntry = leaderboardData.find((entry) => entry.id === user.id);
    if (userEntry) {
      return leaderboardData.indexOf(userEntry) + 1;
    }

    // If user is not in the leaderboard yet, calculate their rank
    const rank =
      leaderboardData.filter((entry) => entry.points > user.points).length + 1;
    return rank;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.name || "Hero"}!
              </h1>
              <p className="text-muted-foreground">
                Continue your journey through the disaster management cycle.
              </p>
            </div>

            {/* Main Disaster Cycle Component */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Disaster Management Cycle
              </h2>
              <p className="text-muted-foreground mb-6">
                Click on a cycle segment to learn more and take on challenges.
              </p>
              <DisasterCycle />
            </div>

            {/* Spin Wheel Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Spin & Quiz
                </CardTitle>
                <CardDescription>
                  Spin the wheel to randomly select a segment and take a quiz to
                  earn points!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <SpinWheel segments={wheelSegments} />
              </CardContent>
            </Card>

            {/* Daily Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Challenges
                </CardTitle>
                <CardDescription>
                  Complete these challenges to earn bonus points and special
                  badges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {challenge.points} pts
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() =>
                            navigate(`/challenge/${challenge.id}`)
                          }>
                          Start <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    className="w-full gap-1"
                    onClick={() => navigate("/challenges")}>
                    View All Challenges <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress & Stats */}
          <div className="w-full md:w-1/3 space-y-6">
            <UserProgress />

            {/* Achievements */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user?.badges.length ? (
                    user.badges.slice(0, 2).map((badge, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{badge}</p>
                          <p className="text-xs text-muted-foreground">
                            Achievement unlocked
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Award className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          No achievements yet
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Complete challenges to earn badges
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() => navigate("/achievements")}>
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Leaderboard</CardTitle>
                <CardDescription>
                  See how you rank among other players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getTopThree().map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-muted-foreground">
                          {index + 1}.
                        </span>
                        <span>{entry.name}</span>
                      </div>
                      <span className="font-medium">
                        {entry.points.toLocaleString()} pts
                      </span>
                    </div>
                  ))}

                  {user && getUserRank() && getUserRank() > 3 && (
                    <div className="flex items-center justify-between py-2 border-b bg-primary/5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-muted-foreground">
                          {getUserRank()}.
                        </span>
                        <span className="font-medium">You</span>
                      </div>
                      <span className="font-medium">
                        {user.points.toLocaleString()} pts
                      </span>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() => navigate("/leaderboard")}>
                    View Full Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
