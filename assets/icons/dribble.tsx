import { createIcon, Icon } from '@chakra-ui/icons';
import { FC } from 'react';

const Dribble: FC = () => (
  <Icon viewBox="0 0 20 20" width="20px" height="20px">
    <DribbleIcon />
  </Icon>
);

export default Dribble;

const DribbleIcon = createIcon({
  displayName: 'DribbleIcon',
  viewBox: '0 0 20 20',
  path: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10c5.51 0 10-4.48 10-10S15.51 0 10 0Zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445-.177-.417-.365-.83-.564-1.236 3.145-1.28 4.577-3.124 4.761-3.362ZM10 1.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 10 1.475Zm-3.633.803a53.895 53.895 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975ZM1.453 10.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.523 8.523 0 0 1-2.191-5.705ZM10 18.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.32 35.32 0 0 1 1.823 6.475 8.402 8.402 0 0 1-3.341.684Zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715Z"
        fill="#9CA3AF"
      />
    </>
  ),
});
