import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const UserProgress = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-4">
              Sign in to track your progress
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate overall completion as average of all categories
  const calculateOverallProgress = () => {
    const values = Object.values(user.progress).filter(
      (val) => typeof val === "number" && !isNaN(val)
    );
    if (values.length === 0) return 0;
    return Math.round(
      values.reduce((sum, val) => sum + val, 0) / values.length
    );
  };

  // Ensure each segment's progress is displayed correctly
  const getProgressValue = (value) => {
    return typeof value === "number" && !isNaN(value) ? value : 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">
                  Overall Completion
                </span>
                <span className="font-medium">
                  {calculateOverallProgress()}%
                </span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
              <div className="flex items-center gap-2">
                <div className="bg-preimpact p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Preparation</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.preparation)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-emergency p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Response</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.response)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-restoration p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Restoration</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.restoration)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-recovery p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recovery</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.recovery)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-mitigation p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mitigation</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.mitigation)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-capacity p-1.5 rounded-md">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-medium">
                    {getProgressValue(user.progress.capacity)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium">Total Points</p>
                  <p className="text-2xl font-bold">
                    {user.points.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Rank</p>
                  <p className="text-2xl font-bold">{getRank(user.points)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Badges</p>
                  <p className="text-2xl font-bold">{user.badges.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to determine rank based on points
function getRank(points: number): string {
  if (points >= 5000) return "Diamond";
  if (points >= 3000) return "Platinum";
  if (points >= 1500) return "Gold";
  if (points >= 750) return "Silver";
  if (points >= 250) return "Bronze";
  return "Rookie";
}

export default UserProgress;
