import React, { Component } from 'react';
import { RoomCreate, RoomList } from './path'

class Chat extends Component {
  render() {
    return (
      <div>
        <RoomCreate />
        <RoomList />
      </div>
    );
  }
}

export default Chat;