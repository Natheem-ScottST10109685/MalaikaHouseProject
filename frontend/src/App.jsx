import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProtectedRoute from './routes/ProtectedRoutes'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Protected pages
import AdminOverview from './pages/dashboard/admin/AdminOverview'
import ParentHome from './pages/dashboard/parent/ParentDashboard'

// Public pages
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/main/Home";
import OurStory from "./pages/main/OurStory";
import ParentInfo from "./pages/main/ParentInfo";
import StaffSupporters from "./pages/main/StaffSupporters";
import WhatWeOffer from "./pages/main/WhatWeOffer";
import ContactUs from "./pages/main/ContactUs";
import BookAVisit from "./pages/main/BookAVisit";
import Login from "./pages/login/LoginPage";

const NotAuthorised = () => <div style={{ padding: 24 }}>Not Authorised.</div>;
const NotFound = () => <div style={{ paffing: 24 }}>Not Found.</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/parent-info" element={<ParentInfo />} />
          <Route path="/staff-supporters" element={<StaffSupporters />} />
          <Route path="/what-we-offer" element={<WhatWeOffer />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/book-a-visit" element={<BookAVisit />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allow={['ADMIN']} Fallback={NotAuthorised}>
            <AdminOverview />
          </ProtectedRoute>
        } />
        <Route path="/parent" element={
          <ProtectedRoute allow={['PARENT']} Fallback={NotAuthorised}>
            <ParentHome />
          </ProtectedRoute>
        } />
        <Route path="/not-authorised" element={<NotAuthorised />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
