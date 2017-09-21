import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import {Home, Error, Test} from './path'

class Routes extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/test' component={Test} />
            <Route component={Error} />
          </Switch>
        </div>
    );
  }
}

export default Routes