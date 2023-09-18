import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Auth/Register';
import Landing from './components/Landing/Landing';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes here */}
        <Route path="/" element={<Login />} /> {/* Use element prop */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
