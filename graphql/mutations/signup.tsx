import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp($emailAddress: EmailAddress!, $firstname: String!, $lastname: String!, $password: String!) {
    signUp(input: { emailAddress: $emailAddress, firstname: $firstname, lastname: $lastname, password: $password }) {
      token
    }
  }
`;
