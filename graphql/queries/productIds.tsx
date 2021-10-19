import { gql } from '@apollo/client';

export const PRODUCTS_IDS = gql`
  query products_ids($first: Int) {
    products(first: $first) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
