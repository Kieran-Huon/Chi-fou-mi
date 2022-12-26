import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegistration from './pages/loginRegistration';
import Matches from './pages/matches';
import SingleMatch from './pages/matches/SingleMatch';
import Play from './pages/play';
import Start from './pages/start';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('Working');
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Routes>
      <Route path='/matches/:id/play' element={<Play />} />
      <Route path='/matches/:id' element={<SingleMatch />} />
      <Route path='/matches' element={<Matches />} />
      <Route path='/start' element={<Start />} />
      <Route path='/' element={<LoginRegistration />} />
    </Routes>
  );
};

export default App;
