import React, { Component } from 'react';
import { welcome } from 'api/socket'

class Room extends Component {
  render() {
    return (
      <div>
        <h3>룸이름</h3>
          <hr />
        -유저리스트-
          <hr />
            <ul>
              <li>
                asd
              </li>
            </ul>
          <br />
        <input></input><button>send</button>
      </div>
    );
  }
}

export default Room;