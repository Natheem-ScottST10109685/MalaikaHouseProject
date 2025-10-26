import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProtectedRoute from './routes/ProtectedRoutes'
import AdminOverview from './pages/dashboard/admin/AdminOverview'
import ParentHome from './pages/dashboard/parent/ParentDashboard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const NotAuthorised = () => <div style={{ padding: 24 }}>Not authorised.</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
