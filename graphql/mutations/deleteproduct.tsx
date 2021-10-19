import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Binary!) {
    deleteProduct(input: { id: $id })
  }
`;
