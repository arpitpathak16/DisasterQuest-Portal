import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Search,
  Medal,
  User as UserIcon,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import CollaborationService, {
  LeaderboardEntry,
} from "@/services/CollaborationService";

interface LeaderboardEntryWithRank extends LeaderboardEntry {
  rank: number;
  isCurrentUser: boolean;
}

const Leaderboard = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardEntryWithRank[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Get initial leaderboard data
    refreshLeaderboardData();

    // Set up subscription for leaderboard updates
    const handleLeaderboardUpdate = (data: LeaderboardEntry[]) => {
      processLeaderboardData(data);
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
  }, [user, isDemo]);

  const refreshLeaderboardData = () => {
    setIsLoading(true);
    const data = CollaborationService.getLeaderboard(isDemo);
    processLeaderboardData(data);
    setIsLoading(false);
  };

  const processLeaderboardData = (data: LeaderboardEntry[]) => {
    // Add rank and check for current user
    const processedData = data.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isCurrentUser: user ? entry.id === user.id : false,
    }));

    // If current user is not in leaderboard yet, add them at the end
    if (user && !processedData.some((entry) => entry.id === user.id)) {
      processedData.push({
        id: user.id,
        name: user.name,
        points: user.points,
        badges: user.badges.length,
        challenges: user.completedChallenges.length,
        joinedAt: user.joinedAt,
        rank: processedData.length + 1,
        isCurrentUser: true,
      });
    }

    setLeaderboardData(processedData);
  };

  const filteredData = leaderboardData.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTopThree = () => {
    return leaderboardData.slice(0, 3);
  };

  const getTopThreeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-gray-300";
      case 3:
        return "bg-amber-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isDemo
                ? "See example rankings to understand how the leaderboard works!"
                : "See how you rank against other disaster heroes. Complete more challenges to climb the ranks!"}
            </p>
          </div>

          {/* Leaderboard Type Tabs */}
          <div className="mb-8">
            <Tabs
              defaultValue="current"
              onValueChange={(value) => setIsDemo(value === "demo")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Rankings</TabsTrigger>
                <TabsTrigger value="demo">Demo Rankings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Top 3 Players */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getTopThree().map((entry) => (
                <Card
                  key={entry.rank}
                  className={`${
                    entry.rank === 1
                      ? "md:order-2 md:scale-110 z-10"
                      : entry.rank === 2
                      ? "md:order-1"
                      : "md:order-3"
                  } ${entry.isCurrentUser ? "border-primary" : ""}`}>
                  <CardHeader className="text-center pb-2">
                    <div
                      className={`w-12 h-12 rounded-full ${getTopThreeColor(
                        entry.rank
                      )} mx-auto flex items-center justify-center`}>
                      {entry.rank === 1 ? (
                        <Trophy className="h-6 w-6 text-white" />
                      ) : (
                        <Medal className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <CardTitle className="mt-2 text-xl">{entry.name}</CardTitle>
                    <CardDescription>Rank #{entry.rank}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-3xl font-bold">{entry.points}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="text-center">
                        <p className="text-lg font-medium">{entry.badges}</p>
                        <p className="text-xs text-muted-foreground">badges</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium">
                          {entry.challenges}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          challenges
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Full Leaderboard */}
          <div>
            <Tabs defaultValue="points">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="points">Points</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search players..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={refreshLeaderboardData}
                    disabled={isLoading}>
                    <RefreshCw
                      className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                  </Button>
                </div>
              </div>

              <TabsContent value="points">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((entry) => (
                          <TableRow
                            key={entry.id}
                            className={
                              entry.isCurrentUser ? "bg-primary/5" : ""
                            }>
                            <TableCell className="font-medium">
                              {entry.rank <= 3 ? (
                                <div
                                  className={`w-6 h-6 rounded-full ${getTopThreeColor(
                                    entry.rank
                                  )} flex items-center justify-center`}>
                                  <span className="text-white text-xs">
                                    {entry.rank}
                                  </span>
                                </div>
                              ) : (
                                entry.rank
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                                  {entry.isCurrentUser ? (
                                    <UserIcon className="h-4 w-4 text-primary" />
                                  ) : (
                                    <UserIcon className="h-4 w-4" />
                                  )}
                                </div>
                                <span
                                  className={
                                    entry.isCurrentUser ? "font-medium" : ""
                                  }>
                                  {entry.name}
                                  {entry.isCurrentUser && " (You)"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              {entry.points}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badges">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-right">Badges</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...filteredData]
                          .sort((a, b) => b.badges - a.badges)
                          .map((entry, index) => (
                            <TableRow
                              key={entry.id}
                              className={
                                entry.isCurrentUser ? "bg-primary/5" : ""
                              }>
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                                    {entry.isCurrentUser ? (
                                      <UserIcon className="h-4 w-4 text-primary" />
                                    ) : (
                                      <UserIcon className="h-4 w-4" />
                                    )}
                                  </div>
                                  <span
                                    className={
                                      entry.isCurrentUser ? "font-medium" : ""
                                    }>
                                    {entry.name}
                                    {entry.isCurrentUser && " (You)"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <BadgeCheck className="h-4 w-4 text-primary" />
                                  <span className="font-bold">
                                    {entry.badges}
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="challenges">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="text-right">
                            Challenges
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...filteredData]
                          .sort((a, b) => b.challenges - a.challenges)
                          .map((entry, index) => (
                            <TableRow
                              key={index}
                              className={
                                entry.isCurrentUser ? "bg-primary/5" : ""
                              }>
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                                    {entry.isCurrentUser ? (
                                      <UserIcon className="h-4 w-4 text-primary" />
                                    ) : (
                                      <UserIcon className="h-4 w-4" />
                                    )}
                                  </div>
                                  <span
                                    className={
                                      entry.isCurrentUser ? "font-medium" : ""
                                    }>
                                    {entry.name}
                                    {entry.isCurrentUser && " (You)"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-bold">
                                {entry.challenges}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button variant="outline" size="sm">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
