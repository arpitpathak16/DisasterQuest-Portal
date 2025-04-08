export interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export const challengeQuestions: Record<string, Question[]> = {
  "emergency-kit": [
    {
      id: 1,
      text: "What is the minimum amount of water recommended per person per day in an emergency kit?",
      options: [
        { id: "a", text: "1 gallon (4 liters)" },
        { id: "b", text: "2 gallons (8 liters)" },
        { id: "c", text: "3 gallons (12 liters)" },
        { id: "d", text: "4 gallons (16 liters)" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      text: "Which of these items should NOT be included in a basic emergency kit?",
      options: [
        { id: "a", text: "First aid supplies" },
        { id: "b", text: "Non-perishable food" },
        { id: "c", text: "Entertainment devices" },
        { id: "d", text: "Flashlight and batteries" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "How often should you check and update your emergency kit?",
      options: [
        { id: "a", text: "Every 6 months" },
        { id: "b", text: "Every year" },
        { id: "c", text: "Every 2 years" },
        { id: "d", text: "Only when there's a warning" },
      ],
      correctAnswer: "a",
    },
  ],
  "fire-escape-plan": [
    {
      id: 1,
      text: "What is the first step in creating a fire escape plan?",
      options: [
        { id: "a", text: "Install smoke alarms" },
        { id: "b", text: "Draw a floor plan" },
        { id: "c", text: "Choose a meeting place" },
        { id: "d", text: "Practice the plan" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "How many escape routes should you plan for each room?",
      options: [
        { id: "a", text: "At least one" },
        { id: "b", text: "At least two" },
        { id: "c", text: "At least three" },
        { id: "d", text: "As many as possible" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "Where should your family meeting place be located?",
      options: [
        { id: "a", text: "Inside the house" },
        { id: "b", text: "At the front door" },
        { id: "c", text: "At a neighbor's house" },
        { id: "d", text: "At a safe distance from the house" },
      ],
      correctAnswer: "d",
    },
  ],
  "flood-response": [
    {
      id: 1,
      text: "What should you do if you receive a flood warning?",
      options: [
        { id: "a", text: "Wait to see if it gets worse" },
        { id: "b", text: "Move to higher ground immediately" },
        { id: "c", text: "Stay in your basement" },
        { id: "d", text: "Drive through flood waters" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "How deep can flood waters be before they become dangerous to drive through?",
      options: [
        { id: "a", text: "2 inches (5 cm)" },
        { id: "b", text: "6 inches (15 cm)" },
        { id: "c", text: "12 inches (30 cm)" },
        { id: "d", text: "24 inches (60 cm)" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "What should you do with electrical appliances during a flood?",
      options: [
        { id: "a", text: "Keep them plugged in" },
        { id: "b", text: "Move them to higher ground" },
        { id: "c", text: "Unplug them and move to higher ground" },
        { id: "d", text: "Cover them with plastic" },
      ],
      correctAnswer: "c",
    },
  ],
  "earthquake-preparedness": [
    {
      id: 1,
      text: "What should you do during an earthquake if you're indoors?",
      options: [
        { id: "a", text: "Run outside immediately" },
        { id: "b", text: "Stand in a doorway" },
        { id: "c", text: "Drop, cover, and hold on" },
        { id: "d", text: "Get near windows for visibility" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      text: "Which of these is NOT a recommended way to secure furniture for earthquakes?",
      options: [
        { id: "a", text: "Using wall brackets" },
        { id: "b", text: "Using adhesive putty" },
        { id: "c", text: "Using duct tape" },
        { id: "d", text: "Using safety straps" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "What should you do after an earthquake?",
      options: [
        { id: "a", text: "Immediately return to your home" },
        { id: "b", text: "Check for gas leaks and structural damage" },
        { id: "c", text: "Ignore aftershocks" },
        { id: "d", text: "Drive around to assess damage" },
      ],
      correctAnswer: "b",
    },
  ],
  "hurricane-safety": [
    {
      id: 1,
      text: "What is the safest place to be during a hurricane?",
      options: [
        { id: "a", text: "In a car" },
        { id: "b", text: "In a mobile home" },
        { id: "c", text: "In a small interior room without windows" },
        { id: "d", text: "On the beach to monitor the storm" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      text: "How far in advance should you prepare for a hurricane?",
      options: [
        { id: "a", text: "The day before landfall" },
        { id: "b", text: "When the hurricane warning is issued" },
        { id: "c", text: "At the beginning of hurricane season" },
        { id: "d", text: "Only when a hurricane is approaching" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "What should you do with windows during a hurricane?",
      options: [
        { id: "a", text: "Open them to equalize pressure" },
        { id: "b", text: "Cover them with plywood or hurricane shutters" },
        { id: "c", text: "Leave them as they are" },
        { id: "d", text: "Tape an X pattern on them" },
      ],
      correctAnswer: "b",
    },
  ],
  "community-recovery": [
    {
      id: 1,
      text: "What is the first step in community recovery after a disaster?",
      options: [
        { id: "a", text: "Rebuilding infrastructure" },
        { id: "b", text: "Assessing damage and needs" },
        { id: "c", text: "Distributing relief supplies" },
        { id: "d", text: "Planning for future disasters" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Which of these is NOT typically a priority in community recovery?",
      options: [
        { id: "a", text: "Restoring essential services" },
        { id: "b", text: "Providing mental health support" },
        { id: "c", text: "Building tourist attractions" },
        { id: "d", text: "Housing displaced residents" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "How can community members help with recovery efforts?",
      options: [
        { id: "a", text: "By staying away from affected areas" },
        { id: "b", text: "By volunteering with relief organizations" },
        { id: "c", text: "By taking photos for social media" },
        { id: "d", text: "By waiting for government assistance only" },
      ],
      correctAnswer: "b",
    },
  ],
  preparation: [
    {
      id: 1,
      text: "What is the primary goal of disaster preparedness?",
      options: [
        { id: "a", text: "To increase population" },
        { id: "b", text: "To cause panic" },
        { id: "c", text: "To minimize the impact of disasters" },
        { id: "d", text: "To relocate people" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      text: "Which of the following is a preparedness activity?",
      options: [
        { id: "a", text: "Rebuilding houses" },
        { id: "b", text: "Emergency drills" },
        { id: "c", text: "Road repairs" },
        { id: "d", text: "Crop rotation" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "Who plays the most important role in community-level disaster preparedness?",
      options: [
        { id: "a", text: "Foreign aid" },
        { id: "b", text: "Local volunteers and leaders" },
        { id: "c", text: "Military" },
        { id: "d", text: "Media" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Which document outlines plans for handling emergency situations?",
      options: [
        { id: "a", text: "Land Record" },
        { id: "b", text: "Emergency Response Plan" },
        { id: "c", text: "Constitution" },
        { id: "d", text: "Taxation Plan" },
      ],
      correctAnswer: "b",
    },
    {
      id: 5,
      text: "In disaster preparedness, what is a go bag?",
      options: [
        { id: "a", text: "A food bag" },
        { id: "b", text: "A shopping bag" },
        { id: "c", text: "A kit with essential survival items" },
        { id: "d", text: "A tool kit" },
      ],
      correctAnswer: "c",
    },
  ],
  response: [
    {
      id: 1,
      text: "Which is the first step in disaster response?",
      options: [
        { id: "a", text: "Long-term planning" },
        { id: "b", text: "Evacuation and rescue" },
        { id: "c", text: "Building shelters" },
        { id: "d", text: "Budgeting" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Emergency shelters are a part of which phase?",
      options: [
        { id: "a", text: "Mitigation" },
        { id: "b", text: "Response" },
        { id: "c", text: "Development" },
        { id: "d", text: "Planning" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "What is a major challenge in disaster response?",
      options: [
        { id: "a", text: "Overpopulation" },
        { id: "b", text: "Transportation breakdown" },
        { id: "c", text: "Monsoons" },
        { id: "d", text: "Crime" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Who coordinates major disaster response efforts in India?",
      options: [
        { id: "a", text: "NITI Aayog" },
        { id: "b", text: "NDRF" },
        { id: "c", text: "WHO" },
        { id: "d", text: "RBI" },
      ],
      correctAnswer: "b",
    },
    {
      id: 5,
      text: "Which communication system is most crucial during response?",
      options: [
        { id: "a", text: "Social media" },
        { id: "b", text: "TV channels" },
        { id: "c", text: "Early warning systems" },
        { id: "d", text: "Newsletters" },
      ],
      correctAnswer: "c",
    },
  ],
  restoration: [
    {
      id: 1,
      text: "What does restoration aim to do?",
      options: [
        { id: "a", text: "Expand roads" },
        { id: "b", text: "Bring back normalcy" },
        { id: "c", text: "Conduct elections" },
        { id: "d", text: "Build schools" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Which of these is a restoration activity?",
      options: [
        { id: "a", text: "Building bridges" },
        { id: "b", text: "Rescue operations" },
        { id: "c", text: "Repairing roads and power lines" },
        { id: "d", text: "Health surveys" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "Restoration is often followed by which phase?",
      options: [
        { id: "a", text: "Preparedness" },
        { id: "b", text: "Recovery" },
        { id: "c", text: "Response" },
        { id: "d", text: "Planning" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Who are key stakeholders in restoration?",
      options: [
        { id: "a", text: "Only govt" },
        { id: "b", text: "Government, NGOs, and locals" },
        { id: "c", text: "Tourists" },
        { id: "d", text: "Private companies only" },
      ],
      correctAnswer: "b",
    },
    {
      id: 5,
      text: "Which of these should be prioritized in restoration?",
      options: [
        { id: "a", text: "Organizing events" },
        {
          id: "b",
          text: "Restoring essential services like water and electricity",
        },
        { id: "c", text: "Tourism" },
        { id: "d", text: "Cultural exchange" },
      ],
      correctAnswer: "b",
    },
  ],
  recovery: [
    {
      id: 1,
      text: "What is a long-term goal of the recovery phase?",
      options: [
        { id: "a", text: "Rescue" },
        { id: "b", text: "Return to normal or improved conditions" },
        { id: "c", text: "Emergency supply" },
        { id: "d", text: "Crowd control" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Recovery focuses on:",
      options: [
        { id: "a", text: "Rescue teams" },
        { id: "b", text: "Waste management" },
        { id: "c", text: "Rebuilding infrastructure and livelihoods" },
        { id: "d", text: "Entertainment" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "Recovery can be both:",
      options: [
        { id: "a", text: "Difficult and dangerous" },
        { id: "b", text: "Short-term and long-term" },
        { id: "c", text: "Costly and slow" },
        { id: "d", text: "Easy and quick" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Recovery planning must include:",
      options: [
        { id: "a", text: "Engineers only" },
        { id: "b", text: "Politicians" },
        { id: "c", text: "Community participation" },
        { id: "d", text: "Bankers" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      text: "A good recovery plan should ensure:",
      options: [
        { id: "a", text: "Temporary shelters" },
        { id: "b", text: "Entertainment" },
        { id: "c", text: "Building back better" },
        { id: "d", text: "Import of materials" },
      ],
      correctAnswer: "c",
    },
  ],
  mitigation: [
    {
      id: 1,
      text: "What is the aim of mitigation in disaster management?",
      options: [
        { id: "a", text: "Increase awareness" },
        { id: "b", text: "Emergency evacuation" },
        { id: "c", text: "Reduce disaster risks and impact" },
        { id: "d", text: "Create panic" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      text: "Building earthquake-resistant houses is an example of:",
      options: [
        { id: "a", text: "Recovery" },
        { id: "b", text: "Response" },
        { id: "c", text: "Mitigation" },
        { id: "d", text: "Planning" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "Planting mangroves helps mitigate which type of disaster?",
      options: [
        { id: "a", text: "Earthquake" },
        { id: "b", text: "Tsunami and coastal flooding" },
        { id: "c", text: "Drought" },
        { id: "d", text: "Avalanche" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Which is a structural mitigation method?",
      options: [
        { id: "a", text: "Education" },
        { id: "b", text: "Training" },
        { id: "c", text: "Cyclone shelters" },
        { id: "d", text: "Awareness" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      text: "Mitigation should be integrated into:",
      options: [
        { id: "a", text: "School curriculum" },
        { id: "b", text: "All developmental planning" },
        { id: "c", text: "Marketing strategies" },
        { id: "d", text: "Transport" },
      ],
      correctAnswer: "b",
    },
  ],
  capacityBuilding: [
    {
      id: 1,
      text: "What does capacity building focus on?",
      options: [
        { id: "a", text: "Infrastructure" },
        {
          id: "b",
          text: "Enhancing skills and knowledge to reduce vulnerability",
        },
        { id: "c", text: "Awareness" },
        { id: "d", text: "Roads" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Which of these is a capacity building activity?",
      options: [
        { id: "a", text: "Rescue operations" },
        { id: "b", text: "Conducting mock drills" },
        { id: "c", text: "Watching news" },
        { id: "d", text: "Cooking meals" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "Why is local capacity important?",
      options: [
        { id: "a", text: "They are always present during a disaster" },
        { id: "b", text: "They need jobs" },
        { id: "c", text: "They fund the recovery" },
        { id: "d", text: "They bring foreign aid" },
      ],
      correctAnswer: "a",
    },
    {
      id: 4,
      text: "Capacity building should target:",
      options: [
        { id: "a", text: "Only officials" },
        { id: "b", text: "Children" },
        { id: "c", text: "All community members" },
        { id: "d", text: "Wealthy people" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      text: "Capacity building is a:",
      options: [
        { id: "a", text: "One-time activity" },
        { id: "b", text: "Long-term and continuous process" },
        { id: "c", text: "Emergency response" },
        { id: "d", text: "Post-disaster effort" },
      ],
      correctAnswer: "b",
    },
  ],
};
