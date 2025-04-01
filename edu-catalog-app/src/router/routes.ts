import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/Home'));
const Bootcamp = lazy(() => import('@/pages/Bootcamp/Bootcamp'));
const Course = lazy(() => import('@/pages/Course/Course'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard/AdminDashboard'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword/ResetPassword'));
const UserDetails = lazy(() => import('@/pages/UserDetails/UserDetails'));

export { Home, Bootcamp, Course, AdminDashboard, ResetPassword, UserDetails };
