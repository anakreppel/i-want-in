import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import './App.css';

import { AuthProvider } from './context/auth';

import NavBar from './NavBar';
import Home from './Main/Home';
import LogIn from './Main/LogIn';
import Registration from './Main/Registration';
import UserDashboard from './Users/Dashboard';
import LessonsList from './Lessons/LessonsList';
import CreateLesson from './Lessons/CreateLesson';
import EventCard from './Lessons/EventCard';
import ManageLesson from './Lessons/ManageLesson';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth='sm'>
          <NavBar />
          <Routes>
            <Route extact path='/' element={<Home />} />
            <Route extact path='/login' element={<LogIn />} />
            <Route extact path='/register' element={<Registration />} />
            <Route
              extact
              path='/dashboard/:userId'
              element={<UserDashboard />}
            />
            <Route extact path='/events' element={<LessonsList />} />
            <Route extact path='/create' element={<CreateLesson />} />
            <Route extact path='/card/:lessonId' element={<EventCard />} />
            <Route extact path='/manage/:lessonId' element={<ManageLesson />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
