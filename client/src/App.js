import React, { Component, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import history from './history';
import NavBar from './components/nav/NavBar';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profiles from './pages/Profiles';

const ENDPOINT = ':8090';

function App() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('connect', (data) => {
      console.log('Socket.io connected.');
    });
  });

  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
      </Switch>
    </Router>
  );
}

export default App;
