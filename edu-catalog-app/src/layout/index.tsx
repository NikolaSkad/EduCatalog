import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import './index.scss';
import Modals from '@/components/Modals';
import { Toaster } from 'sonner';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <div className="layout">
      <div>
        <Header />
        <Modals />
        <Toaster richColors position="bottom-right" duration={2 * 1000} expand />
        <main
          className={clsx(
            'content-wrapper max-w-full md:max-w-[1550px] 4xl:max-w-[1850px] mx-auto p-[12px] lg:p-[36px]',
          )}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
