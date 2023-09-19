import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Auth/Register';
import Landing from './components/Landing/Landing';
import Login from './components/Auth/Login';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import apolloClient from './apolloClient'; // Import your Apollo Client instance

function App() {
  return (
    <ApolloProvider client={apolloClient}> {/* Wrap your app with ApolloProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Add a route with a category parameter */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:category" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

