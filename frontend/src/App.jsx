import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import AdminPanel from './pages/AdminPanel';
import MechanicPanel from './pages/MechanicPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.tipo !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/admin" 
            element={
              <PrivateRoute role="admin">
                <AdminPanel />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/mecanico" 
            element={
              <PrivateRoute role="mecanico">
                <MechanicPanel />
              </PrivateRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
