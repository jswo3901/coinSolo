import React, { Component } from 'react'
import { HomeView, NotFoundView} from 'app'
import { Route, Switch } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route component={NotFoundView} />
          </Switch>
        </div>
    );
  }
}

export default Routes