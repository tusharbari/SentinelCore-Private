import AddAlert from "../pages/AddAlert";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertList from "../pages/AlertList";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddThreat from "../pages/AddThreat";
import ThreatList from "../pages/ThreatList";
import EditThreat from "../pages/EditThreat";
import AddIOC from "../pages/AddIOC";
import IOCList from "../pages/IOCList";
import EditIOC from "../pages/EditIOC";
import EditAlert from "../pages/EditAlert";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/threat-list"
          element={
            <ProtectedRoute>
              <ThreatList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-threat"
          element={
            <ProtectedRoute>
              <AddThreat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-threat/:id"
          element={
            <ProtectedRoute>
              <EditThreat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-ioc"
          element={
            <ProtectedRoute>
              <AddIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ioc-list"
          element={
            <ProtectedRoute>
              <IOCList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-ioc/:id"
          element={
            <ProtectedRoute>
              <EditIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-alert"
          element={
            <ProtectedRoute>
              <AddAlert />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alert-list"
          element={
            <ProtectedRoute>
              <AlertList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-alert/:id"
          element={
            <ProtectedRoute>
              <EditAlert />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;