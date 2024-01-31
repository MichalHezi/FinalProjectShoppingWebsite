import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Navbar from './Navbar';
import Login from './Login';
import { AuthProvider } from './context/AuthProvider';
import Home from './Home';
import MainPage from './MainPage';


function App() {
  
  return (
    <div className="App">
      <AuthProvider>
          <Navbar/>
          <Routes>
              <Route path='/' element={<MainPage/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route />
              <Route />
              <Route />
          </Routes>

      </AuthProvider>

    </div>
  );
}

export default App;
