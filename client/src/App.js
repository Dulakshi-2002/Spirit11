import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { checkAuth } from "./redux/slices/authSlice";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/user/DashboardPage";
import PlayersPage from "./pages/user/PlayersPage";
import TeamPage from "./pages/user/TeamPage";
import LeaderboardPage from "./pages/user/LeaderboardPage";
import BudgetPage from "./pages/user/BudgetPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPlayersPage from "./pages/admin/AdminPlayersPage";
import AdminTeamsPage from "./pages/admin/AdminTeamsPage";
import AdminStatsPage from "./pages/admin/AdminStatsPage";

// Components
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import Loader from "./components/ui/Loader";

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="budget" element={<BudgetPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="players" element={<AdminPlayersPage />} />
          <Route path="teams" element={<AdminTeamsPage />} />
          <Route path="stats" element={<AdminStatsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
