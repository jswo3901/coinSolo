import React, { Component } from 'react';
import { subscribeToTimer } from 'api/socket'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet'
    };
    subscribeToTimer((err, timestamp) => this.setState ({ 
      timestamp })
    );
  }
  render() {
    return (
      <div>
        <p className="App-intro">
        This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default Test;