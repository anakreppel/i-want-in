import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import './App.css';

import { AuthProvider } from './context/auth';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import Home from './Main/Home';
import LogIn from './Main/LogIn';
import Registration from './Main/Registration';
import UserDashboard from './Users/Dashboard';
import LessonsList from './Lessons/LessonsList';
import CreateLesson from './Lessons/CreateLesson';
import LessonCard from './Lessons/LessonCard';
import ManageLesson from './Lessons/ManageLesson';

function App() {
  const navigate = useNavigate();
  return (
    <AuthProvider>
        <CssBaseline />
        <Container maxWidth='sm'>
          <NavBar />
          <Routes>
            <Route extact path='/' element={<Home />} />
            <Route extact path='/login' element={<LogIn navigate={navigate}/>} />
            <Route extact path='/register' element={<Registration />} />
            <Route
              extact
              path='/dashboard/:userId'
              element={<UserDashboard />}
            />
            <Route
              extact
              path='/register/dashboard/:userId'
              element={<UserDashboard />}
            />
            <Route extact path='/lessons' element={<LessonsList />} />
            <Route extact path='/create' element={<CreateLesson />} />
            <Route extact path='/card/:lessonId' element={<LessonCard />} />
            <Route extact path='/manage/:lessonId' element={<ManageLesson />} />
          </Routes>
        </Container>
    </AuthProvider>
  );
}

export default App;
