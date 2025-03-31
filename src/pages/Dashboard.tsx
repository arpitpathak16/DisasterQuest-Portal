
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisasterCycle from '@/components/DisasterCycle';
import UserProgress from '@/components/UserProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Award, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, Hero!</h1>
              <p className="text-muted-foreground">
                Continue your journey through the disaster management cycle.
              </p>
            </div>
            
            {/* Main Disaster Cycle Component */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Disaster Management Cycle</h2>
              <p className="text-muted-foreground mb-6">
                Click on a cycle segment to learn more and take on challenges.
              </p>
              <DisasterCycle />
            </div>
            
            {/* Daily Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Challenges
                </CardTitle>
                <CardDescription>
                  Complete these challenges to earn bonus points and special badges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Create an Emergency Kit</h3>
                      <p className="text-sm text-muted-foreground">Learn what to pack for different emergencies</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">50 pts</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        Start <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Evacuation Planning Quiz</h3>
                      <p className="text-sm text-muted-foreground">Test your knowledge of evacuation procedures</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">30 pts</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        Start <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full gap-1" onClick={() => navigate('/challenges')}>
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
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">First Aid Expert</p>
                      <p className="text-xs text-muted-foreground">Completed all first aid challenges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Award className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flood Response</p>
                      <p className="text-xs text-muted-foreground">Successfully managed the flood scenario</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full text-sm" onClick={() => navigate('/achievements')}>
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Leaderboard Preview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Leaderboard</CardTitle>
                <CardDescription>See how you rank among other players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground">1.</span>
                      <span>DisasterMaster</span>
                    </div>
                    <span className="font-medium">3,450 pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground">2.</span>
                      <span>PreparedHero</span>
                    </div>
                    <span className="font-medium">2,950 pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b bg-primary/5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground">7.</span>
                      <span className="font-medium">You</span>
                    </div>
                    <span className="font-medium">1,250 pts</span>
                  </div>
                  
                  <Button variant="ghost" className="w-full text-sm" onClick={() => navigate('/leaderboard')}>
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
