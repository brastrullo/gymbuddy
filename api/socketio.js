module.exports = (io) => {
  io.on('connection', (socket) => {
    // let [month, date, year] = new Date().toLocaleDateString().split('/');
    // let [hour, minute, second] = new Date()
    //   .toLocaleTimeString()
    //   .slice(0, 7)
    //   .split(':');
    // const s = (second < 10 ? '0' : '') + second;
    // const m = (minute < 10 ? '0' : '') + hour;
    // const h = (hour < 10 ? '0' : '') + hour;
    // const time = `${h}:${m}:${s} - ${date}/${month}/${year}`;

    const time = `${new Date()}`;
    console.log('new connection');
    socket.broadcast.emit('connection', time);

    socket.on('join', ({ name, roomID }, callback) => {
      console.log(name, roomID);
      callback('server', `${name} joined ${roomID}`);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
};
