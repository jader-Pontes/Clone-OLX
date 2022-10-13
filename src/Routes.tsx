import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


// pages
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import SignIn from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import AdPage from './pages/AdPage'

export default () => {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sobre' element={<About />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/ad/:id' element={<AdPage />} />
    </Routes >
  );
};


