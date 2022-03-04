import { createIcon, Icon } from '@chakra-ui/icons';
import { FC } from 'react';

const AddToCartIcon: FC = () => (
  <Icon viewBox="0 0 13 14" width={13} height={14}>
    <AddToCartIconCreate />
  </Icon>
);

export default AddToCartIcon;

const AddToCartIconCreate = createIcon({
  displayName: 'addToCartIcon',
  viewBox: '0 0 13 14',
  path: (
    <>
      <path
        d="M9.833 7.667H3.167L2.1 2.333h10.4L9.833 7.667ZM11.167 11.667a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0ZM4.5 11.667a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
        fill="#805AD5"
      />
      <path
        d="M.5 1h1.333L2.1 2.333m1.067 5.334h6.666L12.5 2.333H2.1m1.067 5.334L2.1 2.333m1.067 5.334L1.638 9.195a.667.667 0 0 0 .471 1.138h7.724m0 0a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667ZM4.5 11.667a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
        stroke="#805AD5"
      />
    </>
  ),
});
