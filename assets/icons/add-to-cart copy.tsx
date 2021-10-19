import { createIcon, Icon } from '@chakra-ui/icons';
import { FC } from 'react';

const DottedIcon: FC = () => (
  <Icon>
    <IconButtonCreate />
  </Icon>
);

export default DottedIcon;

const IconButtonCreate = createIcon({
  displayName: 'IconButton',
  path: (
    <>
      <path
        d="M2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM2 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        fill="#374151"
      />
    </>
  ),
});
