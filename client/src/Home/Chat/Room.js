import React, { Component } from 'react';

class Room extends Component {
  render() {
    return (
      <div>
        <h3>룸이름</h3>
          <hr />
        -유저리스트-
          <hr />
        -채팅리스트- 고정크기
          <br />
        <input></input><button>send</button>
      </div>
    );
  }
}

export default Room;