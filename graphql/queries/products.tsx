import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query products($first: Int, $last: Int, $after: Binary, $before: Binary) {
    products(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          description
          owner {
            id
          }
        }
      }
      pageInfo {
        totalCount
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
