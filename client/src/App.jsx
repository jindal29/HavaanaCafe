import { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import PremiumLoader from './components/ui/PremiumLoader';

// Error Boundary for Debugging
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', zIndex: 9999, position: 'relative' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
          <pre>{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy loading pages for optimal performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Offers = lazy(() => import('./pages/Offers'));
const Contact = lazy(() => import('./pages/Contact'));
const OrderIntegration = lazy(() => import('./pages/OrderIntegration'));
const Payment = lazy(() => import('./pages/Payment'));
const MentorSupport = lazy(() => import('./pages/MentorSupport'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'fallback_client_id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<PremiumLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="offers" element={<Offers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="order" element={<OrderIntegration />} />
                <Route path="payment" element={<Payment />} />
                <Route path="mentor" element={<MentorSupport />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
