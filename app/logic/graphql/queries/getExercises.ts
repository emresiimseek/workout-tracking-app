import {gql} from '@apollo/client';
export const GET_EXERCISES = gql`
  query GetExercises($filters: ExerciseFiltersInput) {
    exercises(filters: $filters) {
      data {
        id
        attributes {
          name
          type
          muscle
          difficulty
          instructions
          reps
          sets
          equipment
          days
          program {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
