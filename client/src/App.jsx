import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Sleek Loading Fallback
const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50/50 dark:bg-navy-950/50">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-academic-100 dark:border-navy-800" />
      <div className="w-12 h-12 rounded-full border-4 border-academic-600 dark:border-academic-400 border-t-transparent animate-spin absolute top-0 left-0" />
    </div>
    <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-navy-400 animate-pulse">
      Loading...
    </span>
  </div>
);

// Public Pages (Lazy Loaded)
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const QualificationsPage = lazy(() => import('./pages/QualificationsPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AwardsPage = lazy(() => import('./pages/AwardsPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EContentPage = lazy(() => import('./pages/EContentPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin CMS Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPublications = lazy(() => import('./pages/admin/AdminPublications'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminAwards = lazy(() => import('./pages/admin/AdminAwards'));
const AdminWorkshops = lazy(() => import('./pages/admin/AdminWorkshops'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminTests = lazy(() => import('./pages/admin/AdminTests'));
const AdminArticles = lazy(() => import('./pages/admin/AdminArticles'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));

// Protected Route Guard for Admin Panel
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950">
        <div className="w-8 h-8 rounded-full border-4 border-academic-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Academic Portfolio Dedicated Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/qualifications" element={<QualificationsPage />} />
        <Route path="/education" element={<Navigate to="/qualifications" replace />} />
        <Route path="/experience" element={<Navigate to="/qualifications" replace />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/workshops" element={<Navigate to="/events" replace />} />
        <Route path="/gallery" element={<Navigate to="/events" replace />} />
        <Route path="/e-content" element={<EContentPage />} />
        <Route path="/notices" element={<Navigate to="/e-content" replace />} />
        <Route path="/announcements" element={<Navigate to="/e-content" replace />} />
        <Route path="/tests" element={<Navigate to="/e-content" replace />} />
        <Route path="/assessments" element={<Navigate to="/e-content" replace />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Login Portal */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Management Portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="tests" element={<AdminTests />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="awards" element={<AdminAwards />} />
          <Route path="workshops" element={<AdminWorkshops />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
