import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Camera from '../pages/Camera';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/camera" component={Camera} />
    </BrowserRouter>
  );
};

export default Routes;
