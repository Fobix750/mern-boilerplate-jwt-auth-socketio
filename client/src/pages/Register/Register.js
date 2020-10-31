import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';

import { registerSchema } from './validation';
import { registerUser } from '../../store/actions/authActions';
import history from '../../history';

function Register({ auth, registerUser }) {
  if (auth.isAuthenticated) return <Redirect to="/" />;
  const handleRegister = async (formData) => {
    registerUser(formData, history);
  };
  return (
    <React.Fragment>
      <h1>Register</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirm: ''
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
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
                placeholder="Username"
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && <b>{errors.username}</b>}

              <input
                name="email"
                onChange={handleChange}
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Email"
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && <b>{errors.email}</b>}
              <input
                name="password"
                onChange={handleChange}
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && <b>{errors.password}</b>}
              <input
                name="passwordConfirm"
                onChange={handleChange}
                type="password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                onBlur={handleBlur}
                value={values.passwordConfirm}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <b>{errors.passwordConfirm}</b>
              )}
              <button
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
                disabled={!(dirty && isValid)}
                type="submit"
              >
                Create Account
              </button>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
