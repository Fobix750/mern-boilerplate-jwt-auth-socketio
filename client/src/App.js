import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";

import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profiles from "./pages/Profiles";
import Logout from "./pages/Logout";

import { checkAuth } from "./store/actions/authActions";

const ENDPOINT = ":8090";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  });
  useEffect(() => {
    // Create Socket.io connection
    const socket = socketIOClient(ENDPOINT, {
      query: {
        token: localStorage.token ? localStorage.token : ""
      }
    });
    socket.on("connect", (data) => {
      console.log("Socket.io connected.");
    });
  });

  return loading ? (
    <p>Loading...</p>
  ) : (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
