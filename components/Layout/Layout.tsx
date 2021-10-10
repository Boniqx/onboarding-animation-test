import Header from '@components/header';
import { FC } from 'react';

const Layout: FC = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Layout;
