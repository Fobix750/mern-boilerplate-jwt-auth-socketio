import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';

import history from '../../history';
import { loginSchema } from './validation';
import { loginUser } from '../../store/actions/authActions';

function Login({ auth, loginUser }) {
  if (auth.isAuthenticated) return <Redirect to="/" />;
  const handleLogin = (formData) => {
    loginUser(formData, history);
  };
  return (
    <React.Fragment>
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
                className={errors.username && touched.username && 'error'}
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
              {errors.username && touched.username && <b>{errors.username}</b>}
              <input
                className={errors.password && touched.password && 'error'}
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && <b>{errors.password}</b>}
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
      <Link to="/register">Register</Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
