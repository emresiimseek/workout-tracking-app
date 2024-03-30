import {gql} from '@apollo/client';

export const DELETE_PROGRAM = gql`
  mutation deleteProgram($id: ID!) {
    deleteProgram(id: $id) {
      data {
        id
      }
    }
  }
`;
