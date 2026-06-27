import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";

// Pages
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ApplicationsPage from "./pages/applications/ApplicationsPage.jsx";
import ApplicationDetailPage from "./pages/applications/ApplicationDetailPage.jsx";
import InterviewsPage from "./pages/interviews/InterviewsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

// Layout
import AppLayout from "./components/layout/AppLayout.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/applications/:id" element={<ApplicationDetailPage />} />
      <Route path="/interviews" element={<InterviewsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
