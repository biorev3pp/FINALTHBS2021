import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="App">
      <div className="container bg-white">
        <Header />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};

export default App;
