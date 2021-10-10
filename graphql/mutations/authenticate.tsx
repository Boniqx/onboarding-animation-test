import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($emailAddress: EmailAddress!, $password: String!) {
    authenticate(input: { emailAddress: $emailAddress, password: $password }) {
      token
    }
  }
`;
