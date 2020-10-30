import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

import { loginSchema } from './validation';
import history from '../../history';
import setAuthToken from '../../utils/setAuthToken';

class Login extends Component {
  tryLogin = async (data) => {
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/auth/login`,
        data: {
          username: data.username,
          password: data.password
        }
      });
      if (res.data.error) return alert(res.data.error);
      setAuthToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert(`Welcome ${res.data.me.username}!`);
      history.push('/');
    } catch (err) {
      console.log(err);
      alert('Login failed...');
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={this.tryLogin}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <b>{errors.username}</b>
                )}
                <input
                  name="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  type="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <b>{errors.password}</b>
                )}
                <button
                  className={!(dirty && isValid) ? 'disabled-btn' : ''}
                  disabled={!(dirty && isValid)}
                  type="submit"
                >
                  Login
                </button>
              </form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default Login;
