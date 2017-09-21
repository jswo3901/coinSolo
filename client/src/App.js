import React from 'react';
import Routes from 'app/Routes';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Routes}/>
    </BrowserRouter> 
  );
};

export default App;