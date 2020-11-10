module.exports = (io) => {
  io.on('connection', (socket) => {
    if (socket.user)
      console.log(`Socket.io: ${socket.user.username} connected.`);
    else console.log('A guest connected');
  });
};
