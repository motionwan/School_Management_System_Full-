import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import UserCircle from '../UserCircle/UserCircle';
import { SLayout, SMain } from './layout.styles';

const Layout = ({ children }) => {
  return (
    <SLayout>
      <UserCircle />
      <Sidebar />
      <SMain>{children}</SMain>
    </SLayout>
  );
};

export default Layout;
