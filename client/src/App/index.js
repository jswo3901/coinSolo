import React from 'react';
import Routes from './Routes';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Routes}/>
    </BrowserRouter> 
  );
};

export default App;