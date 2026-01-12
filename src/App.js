import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterStaff from "./pages/RegisterStaff";
import RegisterMember from "./pages/Member";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-staff"
          element={
            <PrivateRoute>
              <RegisterStaff />
            </PrivateRoute>
          }
        />
        <Route 
          path="/member/:id" 
          element={
            <RegisterMember />
            } />
        <Route 
          path="/register-member" 
          element={
            <RegisterMember />
          } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
