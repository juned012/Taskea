import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Loader from "./components/Loader";
import SessionExpired from "./pages/SessionExpired";

const ProtectedRoute = ({ children }) => {
  const { loading, token, isExpired } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }
  if (isExpired) {
    return <SessionExpired />;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { loading, token, isExpired } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }
  if (isExpired) {
    return <SessionExpired />;
  }
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
