require('dotenv').config();

const { createServer } = require('node:https');
const next = require('next');
const fs = require('fs');
const { Server } = require('socket.io');
const socketChat = require('./src/components/api/socket');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.DEFAULT_PORT;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync('cert.key'),
    cert: fs.readFileSync('cert.crt')
  };
  const httpServer = createServer(options, handler);

  const io = new Server(httpServer);

  let activeUsers = new Set();

  io.on('connection', (socket) => {
    activeUsers.add(socket.id);
    console.log('user connected', activeUsers.size);

    io.emit('activeUsers', activeUsers.size);

    socket.on('disconnect', () => {
      activeUsers.delete(socket.id);
      console.log('User disconnected');

      io.emit('activeUsers', activeUsers.size);
    });

    socket.on('send-message', async (data) => {
      let response = await socketChat(data);
      io.emit('message', response);
    });

    socket.on('typing', (user) => {
      io.emit('typing', user);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
