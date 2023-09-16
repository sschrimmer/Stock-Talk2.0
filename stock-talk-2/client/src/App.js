import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <Router>
        <Route path="/Dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;

