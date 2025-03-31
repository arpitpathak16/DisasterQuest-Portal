
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
      text: "What is one essential item in an emergency kit?",
      options: [
        { id: "a", text: "Board games" },
        { id: "b", text: "Flashlight" },
        { id: "c", text: "Candy" },
        { id: "d", text: "Laptop" }
      ],
      correctAnswer: "b"
    },
    {
      id: 2,
      text: "How much water should you have per person per day?",
      options: [
        { id: "a", text: "1 liter" },
        { id: "b", text: "2 liters" },
        { id: "c", text: "4 liters" },
        { id: "d", text: "None" }
      ],
      correctAnswer: "c"
    }
  ]
  // Add more challenge IDs with their respective questions here
};
