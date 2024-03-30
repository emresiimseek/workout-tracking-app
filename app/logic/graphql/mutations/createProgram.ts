import {gql} from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation update($data: ProgramInput!) {
    createProgram(data: $data) {
      data {
        id
      }
    }
  }
`;
