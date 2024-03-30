import {gql} from '@apollo/client';

export const CREATE_EXERCISE = gql`
  mutation update($data: ExerciseInput!) {
    createExercise(data: $data) {
      data {
        id
      }
    }
  }
`;
