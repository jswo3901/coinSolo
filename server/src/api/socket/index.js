const ioServer = (io) => {
  io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
      console.log('클라이언트가 인터벌을 갖고 타이머를 subcribe하는 중입니다 ', interval)
      setInterval(() => {
        client.emit('timer', new Date())
      }, interval)
    })
  })
}

export default ioServer