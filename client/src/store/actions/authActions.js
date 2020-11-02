import axios from 'axios';

import { SET_CURRENT_USER, GET_ERRORS } from '../types';

//Register User
export const registerUser = (formData, history) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `http://localhost:8080/auth/register`,
      data: {
        username: formData.username,
        password: formData.password,
        email: formData.email
      }
    });
    if (res.data.error) return alert(res.data.error);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Login User
export const loginUser = (formData, history) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `http://localhost:8080/auth/login`,
      data: {
        username: formData.username,
        password: formData.password
      }
    });
    if (res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.error
      });
      return;
    }
    localStorage.setItem('token', res.data.token);
    history.push('/');
    attachToken(res.data.token);
    dispatch(setUser(res.data.me));
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: 'Login Failed'
    });
  }
};

// Check if user is authenticated
export const checkAuth = () => async (dispatch) => {
  if (localStorage.token) {
    const token = localStorage.token;
    attachToken(token);
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/auth/checkAuth`
      });
      if (res.data.me) dispatch(setUser(res.data.me));
    } catch (err) {
      console.log(err);
      dispatch(logoutUser());
    }
  }
};

// Set User Information
export const setUser = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload
  };
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch(setUser());
  attachToken(false);
};

// Attach JWT Token to Authorization header
export const attachToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization']; // If there is no token set remove the Authorization header
  }
};
