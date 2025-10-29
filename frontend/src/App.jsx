import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import Notifications from './pages/Notifications';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';
import axios from 'axios';

const App = () => {

  //axios
  const { data: authData, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry: false,
  });
  const authUser = authData?.user


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
