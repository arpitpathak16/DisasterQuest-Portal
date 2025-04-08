import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Award, Users, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import imagePath from "../assets/exp.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-preimpact/20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Master Disaster Management Through Play
                </h1>
                <p className="text-xl text-muted-foreground">
                  Learn vital skills, earn rewards, and become a disaster
                  response hero in our gamified learning platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => navigate("/dashboard")}
                    size="lg"
                    className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => navigate("/challenges")}
                    variant="outline"
                    size="lg">
                    View Challenges
                  </Button>
                  <Button
                    onClick={() => navigate("/game")}
                    size="lg"
                    className="gap-2">
                    Play Game
                  </Button>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div className="aspect-square rounded-full bg-white p-4 shadow-xl overflow-hidden">
                  <img
                    src={imagePath}
                    alt="Disaster Management Cycle"
                    className="w-full h-full object-cover scale-110 transition-transform duration-1000 animate-rotate"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-white text-sm font-bold rounded-full p-3 shadow-lg animate-float">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="p-4 max-w-5xl mx-auto text-center">
                  <button
                    onClick={() => navigate("/advanced-earthquake-game")}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl shadow">
                    🎮 Play Advanced Earthquake Game
                  </button>

                  <button
                    onClick={() => navigate("/disaster-news")}
                    className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-xl shadow">
                    📰 View Disaster News
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Why DisasterQuest Works</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our gamified approach makes learning disaster management
                engaging, effective, and fun.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-preimpact">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Learn by Doing</h3>
                <p className="text-muted-foreground">
                  Interactive challenges and scenarios that put your knowledge
                  to the test in realistic situations.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-emergency">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Earn & Progress</h3>
                <p className="text-muted-foreground">
                  Unlock badges, earn points, and climb the ranks as you master
                  different aspects of disaster management.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-recovery">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold">Community Building</h3>
                <p className="text-muted-foreground">
                  Connect with others, share knowledge, and work together to
                  build more resilient communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-capacity text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Become a Disaster Hero?
            </h2>
            <p className="max-w-2xl mx-auto text-white/80 mb-8">
              Start your journey today and learn vital skills that could save
              lives during disasters.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={() => navigate("/dashboard")}>
              Begin Your Training <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
