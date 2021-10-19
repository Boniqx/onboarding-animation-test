import { gql } from '@apollo/client';

export const SINGLE_PRODUCT = gql`
  query single_product($id: Binary) {
    products(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          description
          name
        }
      }
    }
  }
`;
