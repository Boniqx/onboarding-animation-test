import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation updateproduct($id: Binary!, $name: String!, $description: String!) {
    updateProduct(input: { id: $id, body: { name: $name, description: $description } }) {
      name
      description
    }
  }
`;
