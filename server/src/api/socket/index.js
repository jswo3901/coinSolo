const ioEvents = (io) => {
  // 하나
  io.on('connection', (socket) => {
    // 접속시 toclient라는 이벤트명으로 msg라는 데이터 전송하는 이벤트 등록
    socket.emit('welcome', { msg: 'Welcome !' })
    // // fromclient라는 이벤트 발생시, data를 받아 다른 클라이언트와 전송한 클라이언트에 보냄 
    // socket.on('fromclient', function (data) {
    //   socket.broadcast.emit('toclient', data) // 전송한 클라이언트 제외한 모든 클라이언트
    //   socket.emit('toclient', data) // 전송한 클라이언트
    //   console.log('클라이언트로부터 도착한 메시지내용 :' + data.msg)
    // })
  })
  // 둘
}

export default ioEvents