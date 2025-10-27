import { Routes, Route } from 'react-router';
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
  const {data, isLoading, isError} = useQuery({
    queryKey:["todos"],
    queryFn: async() => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry: false,
  });
  
  console.log({data})
  console.log({isLoading})
  console.log({isError})
  
  return <div className=" h-screen" data-theme='night'>
    <button onClick={() => toast.success('Hello World')}>Create a toast!</button>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/onboarding" element={<OnboardingPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
      <Route path="/call" element={<CallPage />}></Route>
      <Route path="/chat" element={<ChatPage />}></Route>
    </Routes>

    <Toaster />
    
  </div>;
};

export default App;
