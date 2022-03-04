import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $description: String!) {
    createProduct(input: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;
