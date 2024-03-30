interface Exercise {
  name: string;
  type: string; // e.g., "strength", "cardio", etc.
  muscle: string; // primary muscle targeted
  equipment: string[]; // array in case multiple equipment options are possible
  difficulty: string; // e.g., "beginner", "intermediate", "advanced"
  instructions: string; // step-by-step instructions for performing the exercise
  program: {id: number};

  reps: string;
  sets: string;
  days: string[];
}
