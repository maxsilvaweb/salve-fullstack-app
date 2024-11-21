import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import { client } from '@/lib/apollo';
import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { Navbar } from '@/components/layout/Navbar';
import { ClinicsTable } from '@/components/clinics/ClinicsTable';
import { ToastProvider, ToastViewport } from '@/components/ui/Toast';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-red-500">
                <Routes>
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <ClinicsTable />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
            <ToastViewport />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
