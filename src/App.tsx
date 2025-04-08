import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatbotHelp from "./components/ChatbotHelp";
import { UserProvider } from "./contexts/UserContext";
import Quiz from "@/pages/Quiz";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Challenge from "./pages/Challenge";
import Leaderboard from "./pages/Leaderboard";
import Help from "./pages/Help";
import EarthquakeGame from "./components/EarthquakeGame";
import NotFound from "./pages/NotFound";
import AdvancedEarthquakeGame from "./components/AdvancedEarthquakeGame";
import DisasterNews from "./components/DisasterNews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenge/:id" element={<Challenge />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/help" element={<Help />} />
            <Route path="/game" element={<EarthquakeGame />} />
            <Route path="/session/:sessionId" element={<Dashboard />} />
            <Route path="/quiz/:segmentId" element={<Quiz />} />
            <Route
              path="/advanced-earthquake-game"
              element={<AdvancedEarthquakeGame />}
            />
            <Route path="/disaster-news" element={<DisasterNews />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotHelp />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
