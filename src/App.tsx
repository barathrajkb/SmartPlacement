import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/ProtectedRoute';

const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CompanyIntelligence = React.lazy(() => import('./pages/CompanyIntelligence'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
const MockInterview = React.lazy(() => import('./pages/MockInterview'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Collaborate = React.lazy(() => import('./pages/Collaborate'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const CareerCoach = React.lazy(() => import('./pages/CareerCoach'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Scheduler = React.lazy(() => import('./pages/Scheduler'));
const Settings = React.lazy(() => import('./pages/Settings'));
const ForumThread = React.lazy(() => import('./pages/ForumThread'));

export default function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-background">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-ambient"></div>
        </div>
      }>
        <Routes>
          {/* Public Auth */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Main App Shell */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="companies" element={<CompanyIntelligence />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="mock-interview" element={<MockInterview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="collaborate" element={<Collaborate />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="coach" element={<CareerCoach />} />
            <Route path="resources" element={<Resources />} />
            <Route path="scheduler" element={<Scheduler />} />
            <Route path="settings" element={<Settings />} />
            <Route path="forum/:id" element={<ForumThread />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
