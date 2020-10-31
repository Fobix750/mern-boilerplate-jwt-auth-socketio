import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../store/actions/authActions';
import history from '../history';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
    history.push('/');
  });

  return <p>Logout in progress</p>;
};

export default Logout;
