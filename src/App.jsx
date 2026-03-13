import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { ProjectList } from './pages/ProjectList';
import { DPRForm } from './pages/DPRForm';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<Layout />}>
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:id/dpr" element={<DPRForm />} />
              <Route path="/" element={<Navigate to="/projects" replace />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
