import React, { useEffect } from 'react';
import Header from './components/admin/Header';
import Posts from './components/admin/Posts';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  });

  return (
    <div className="App">
      <div className="container-fluid bg-white">
        <Header />
        <Posts />
      </div>
    </div>
  );
};

export default App;
