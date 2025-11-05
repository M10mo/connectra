import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import Notifications from './pages/Notifications';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import toast, { Toaster } from 'react-hot-toast';
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';

const App = () => {

  const { isLoading, authUser } = useAuthUser();


  if (isLoading) return <PageLoader />;


  return <div className=" h-screen" data-theme='night'>

    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to='/login' />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/notifications" element={authUser ? <Notifications /> : <Navigate to="/login" />} />
      <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
      <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="login" />} />
    </Routes>

    <Toaster />

  </div>;
};

export default App;
