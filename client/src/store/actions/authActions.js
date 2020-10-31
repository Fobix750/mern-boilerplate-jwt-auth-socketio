import axios from 'axios';

import { SET_CURRENT_USER, GET_ERRORS } from '../types';

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
    }
    dispatch(attachToken(res.data.token));
    localStorage.setItem('token', res.data.token);
    dispatch(setUser(res.data.me));
    history.push('/');
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Check if user is authenticated
export const checkAuth = () => async (dispatch) => {
  if (localStorage.token) {
    const token = localStorage.token;
    dispatch(attachToken(token));
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/auth/checkAuth`
      });
      if (res.data.user) dispatch(setUser(res.data.user));
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
export const logoutUser = () => {
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
