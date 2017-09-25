import app from './app'
import http from 'http'
import socket from 'socket.io'
import ioServer from 'api/socket'

// make http server
const httpServer = http.createServer(app)
// upgrade to socket.io server
const io = socket.listen(httpServer)

// db 연결
const db = require('./db')
db.connect()

// socket.io
ioServer(io)

// server open
const PORT = 3001
httpServer.listen(PORT, () => {
  console.log(`server is connected on port ${PORT}`)
})