import React, { Component } from 'react';
import {HomeTemplate, Create, Test} from 'components'

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeTemplate
          firstDiv={<Create/>}
          secondDiv={<Test/>}
          thirdDiv={<Test/>}
        >
        </HomeTemplate>
      </div>
    );
  }
}

export default HomePage;