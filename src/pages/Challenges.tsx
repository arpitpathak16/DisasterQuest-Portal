import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useChallengeProgress } from "@/contexts/ChallengeContext";
import { challenges as staticChallenges } from "@/lib/challenges";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  progress: number;
}

const Challenges = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { progressMap } = useChallengeProgress();
  const challenges: Challenge[] = staticChallenges.map((c) => ({
    ...c,
    progress: progressMap[c.id] || 0,
  }));

  const handleStartChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Started",
      description: "You've started a new challenge!",
    });
    navigate(`/challenge/${challengeId}`);
  };

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Challenges
            </h1>
            <p className="text-muted-foreground">
              Test your skills and knowledge with these interactive challenges
              across all phases of disaster management.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search challenges..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Challenge Tabs and Cards */}
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="restoration">Restoration</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
              <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Building</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    category={challenge.category}
                    difficulty={challenge.difficulty}
                    points={challenge.points}
                    progress={challenge.progress}
                    onStart={() => handleStartChallenge(challenge.id)}
                  />
                ))}
              </div>
            </TabsContent>

            {[
              "preparation",
              "response",
              "restoration",
              "recovery",
              "mitigation",
              "capacity",
            ].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges
                    .filter((challenge) => challenge.category === category)
                    .map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        title={challenge.title}
                        description={challenge.description}
                        category={challenge.category}
                        difficulty={challenge.difficulty}
                        points={challenge.points}
                        progress={challenge.progress}
                        onStart={() => handleStartChallenge(challenge.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Challenges;
