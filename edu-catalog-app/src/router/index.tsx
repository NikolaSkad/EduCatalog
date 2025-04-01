import { Suspense } from 'react';
import Layout from '../layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminDashboard, Bootcamp, Course, Home, ResetPassword, UserDetails } from './routes';

export default function AppRouter() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<Bootcamp />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-info" element={<UserDetails />} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
