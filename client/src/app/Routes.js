import React, { Component } from 'react'
import { HomePage, NotFoundPage} from 'app'
import { Route, Switch } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    );
  }
}

export default Routes