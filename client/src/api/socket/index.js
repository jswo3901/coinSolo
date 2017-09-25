import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

export const welcome = () => {
  socket.on('welcome', (data) => {
    console.log(data.msg)
  });
}