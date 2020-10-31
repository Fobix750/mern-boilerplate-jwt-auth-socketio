import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import history from './history';
import NavBar from './components/nav/NavBar';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profiles from './pages/Profiles';
import Logout from './pages/Logout';

import { checkAuth } from './store/actions/authActions';

const ENDPOINT = ':8090';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  });
  useEffect(() => {
    // Create Socket.io connection
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
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
      </Switch>
    </Router>
  );
}

export default App;
