import { gql } from '@apollo/client';

export const ME = gql`
  query {
    me {
      id
      firstname
      lastname
      emailAddress
    }
  }
`;
