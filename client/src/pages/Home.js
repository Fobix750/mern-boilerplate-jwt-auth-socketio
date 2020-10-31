import React from 'react';
import { useSelector } from 'react-redux';
const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <h1>Hello, {isAuthenticated ? user.username : 'Guest'}</h1>
      {isAuthenticated ? <h3>Created account at: {user.createdAt}</h3> : ''}
    </React.Fragment>
  );
};

export default Home;
