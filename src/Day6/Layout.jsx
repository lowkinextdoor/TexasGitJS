import React from 'react';
import Navbar from './Component/Navbar'; // or correct path
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* VERY IMPORTANT: renders child routes like Viewuser */}
    </div>
  );
}
