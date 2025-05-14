import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Toaster } from './components/ui/Toaster';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import SubjectManagement from './pages/subjects/SubjectManagement';
import SubjectDetails from './pages/subjects/SubjectDetails';
import ReportSubmit from './pages/reports/ReportSubmit';
import ReportsList from './pages/reports/ReportsList';
import UsersList from './pages/users/UsersList';
import ProfilePage from './pages/profile/ProfilePage';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={<Layout />}>
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Faculty Routes */}
              <Route 
                path="/faculty" 
                element={
                  <ProtectedRoute allowedRoles={['faculty']}>
                    <FacultyDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Routes */}
              <Route 
                path="/student" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Common Routes with Role-Based Protection */}
              <Route 
                path="/subjects" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
                    <SubjectManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subjects/:id" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
                    <SubjectDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports/submit" 
                element={
                  <ProtectedRoute allowedRoles={['faculty', 'student']}>
                    <ReportSubmit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
                    <ReportsList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UsersList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect root to the appropriate dashboard based on role */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;