
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../common/Footer';

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
