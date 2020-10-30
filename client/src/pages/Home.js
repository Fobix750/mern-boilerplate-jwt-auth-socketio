import React, { Component } from 'react';
import axios from 'axios';
class home extends Component {
  state = { username: null };
  componentDidMount() {
    this.fetchUsername();
  }
  fetchUsername = async () => {
    try {
      const data = await fetch('/api/getUsername');
      const fetchUsername = await data.json();
      console.log(fetchUsername);
      this.setState({ username: fetchUsername.username });
    } catch (err) {
      console.log(err);
    }
  };
  checkLogin = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/api/protected`,
        data: {
          token: localStorage.token
        }
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.username ? (
          <h3>Loading...</h3>
        ) : (
          <h1>Hi, {this.state.username}!</h1>
        )}

        <button onClick={this.checkLogin}>Check Login</button>
      </React.Fragment>
    );
  }
}

export default home;
