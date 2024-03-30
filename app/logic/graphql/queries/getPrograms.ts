import {gql} from '@apollo/client';
export const GET_PROGRAMS = gql`
  query GetPrograms($filters: ProgramFiltersInput) {
    programs(filters: $filters) {
      data {
        id
        attributes {
          name
          active
        }
      }
    }
  }
`;
