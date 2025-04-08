import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Wheel } from "react-custom-roulette";

interface Segment {
  id: string;
  name: string;
  color: string;
}

interface SpinWheelProps {
  segments: Segment[];
}

// Define question sets for each segment
const questionSets = {
  earthquake: [
    "What should you do during an earthquake?",
    "How can you secure furniture to prevent injuries?",
    "What is the safest place to be during an earthquake?",
  ],
  hurricane: [
    "What preparations should you make for a hurricane?",
    "How can you protect windows during a hurricane?",
    "What is the best way to stay informed during a hurricane?",
  ],
  flood: [
    "What should you do if you are caught in a flood?",
    "How can you protect your home from flooding?",
    "What are the signs of an impending flood?",
  ],
  wildfire: [
    "What is the best way to evacuate during a wildfire?",
    "How can you create a defensible space around your home?",
    "What should you include in a wildfire emergency kit?",
  ],
  preparation: [
    "What is the primary goal of disaster preparedness? (Correct: c) To minimize the impact of disasters",
    "Which of the following is a preparedness activity? (Correct: b) Emergency drills",
    "Who plays the most important role in community-level disaster preparedness? (Correct: b) Local volunteers and leaders",
    "Which document outlines plans for handling emergency situations? (Correct: b) Emergency Response Plan",
    "In disaster preparedness, what is a go bag? (Correct: c) A kit with essential survival items",
  ],
  response: [
    "Which is the first step in disaster response? (Correct: b) Evacuation and rescue",
    "Emergency shelters are a part of which phase? (Correct: b) Response",
    "What is a major challenge in disaster response? (Correct: b) Transportation breakdown",
    "Who coordinates major disaster response efforts in India? (Correct: b) NDRF",
    "Which communication system is most crucial during response? (Correct: c) Early warning systems",
  ],
  restoration: [
    "What does restoration aim to do? (Correct: b) Bring back normalcy",
    "Which of these is a restoration activity? (Correct: c) Repairing roads and power lines",
    "Restoration is often followed by which phase? (Correct: b) Recovery",
    "Who are key stakeholders in restoration? (Correct: b) Government, NGOs, and locals",
    "Which of these should be prioritized in restoration? (Correct: b) Restoring essential services like water and electricity",
  ],
  recovery: [
    "What is a long-term goal of the recovery phase? (Correct: b) Return to normal or improved conditions",
    "Recovery focuses on: (Correct: c) Rebuilding infrastructure and livelihoods",
    "Recovery can be both: (Correct: b) Short-term and long-term",
    "Recovery planning must include: (Correct: c) Community participation",
    "A good recovery plan should ensure: (Correct: c) Building back better",
  ],
  mitigation: [
    "What is the aim of mitigation in disaster management? (Correct: c) Reduce disaster risks and impact",
    "Building earthquake-resistant houses is an example of: (Correct: c) Mitigation",
    "Planting mangroves helps mitigate which type of disaster? (Correct: b) Tsunami and coastal flooding",
    "Which is a structural mitigation method? (Correct: c) Cyclone shelters",
    "Mitigation should be integrated into: (Correct: b) All developmental planning",
  ],
  capacityBuilding: [
    "What does capacity building focus on? (Correct: b) Enhancing skills and knowledge to reduce vulnerability",
    "Which of these is a capacity building activity? (Correct: b) Conducting mock drills",
    "Why is local capacity important? (Correct: a) They are always present during a disaster",
    "Capacity building should target: (Correct: c) All community members",
    "Capacity building is a: (Correct: b) Long-term and continuous process",
  ],
};

const SpinWheel: React.FC<SpinWheelProps> = ({ segments }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  // Convert segments to the format expected by react-custom-roulette
  const wheelData = segments.map((segment) => ({
    option: segment.name,
    style: { backgroundColor: segment.color, textColor: "white" },
  }));

  const handleSpinClick = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to spin the wheel.",
        variant: "destructive",
      });
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    // Get random segment index
    const newPrizeNumber = Math.floor(Math.random() * segments.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinStop = () => {
    setMustSpin(false);
    setIsSpinning(false);
    const selected = segments[prizeNumber];
    setSelectedSegment(selected);

    toast({
      title: "Segment Selected!",
      description: `You landed on ${selected.name}. Get ready for the quiz!`,
    });

    // Get the questions for the selected segment
    const questions = questionSets[selected.id] || [];

    // Navigate to quiz page with questions after a short delay
    setTimeout(() => {
      navigate(`/quiz/${selected.id}`, { state: { questions } });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-primary z-30" />

        {/* Center text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="font-semibold text-gray-800">Disaster</div>
              <div className="font-semibold text-gray-800">Management</div>
              <div className="font-semibold text-gray-800">Cycle</div>
            </div>
          </div>
        </div>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          onStopSpinning={handleSpinStop}
          textDistance={60}
          fontSize={14}
          radiusLineWidth={1}
          outerBorderWidth={3}
          innerBorderWidth={2}
          innerBorderColor="#fff"
          outerBorderColor="#ccc"
          radiusLineColor="#e2e8f0"
          spinDuration={0.8}
          startingOptionIndex={0}
          backgroundColors={segments.map((s) => s.color)}
          textColors={Array(segments.length).fill("#ffffff")}
        />
      </div>

      <Button
        onClick={handleSpinClick}
        disabled={isSpinning}
        size="lg"
        className="gap-2 text-lg px-8 py-6 mt-8">
        <RefreshCw className={`h-5 w-5 ${isSpinning ? "animate-spin" : ""}`} />
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>

      {selectedSegment && !isSpinning && (
        <div className="text-center mt-4">
          <p className="font-medium">Selected: {selectedSegment.name}</p>
          <p className="text-sm text-muted-foreground">
            Preparing your quiz...
          </p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
