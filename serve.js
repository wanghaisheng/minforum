require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const next = require('next');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const socketChat = require('./src/components/api/socket');
const {
  rewardDevotee,
  rewardVeteran,
  rewardFavorite,
  rewardPeopleChoice,
  rewardProlific,
  rewardWordsmith,
  rewardGenius,
  rewardPolymath
} = require('./src/components/api/reward');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.DEFAULT_PORT;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  // Serve static files
  expressApp.use('/static', express.static(path.join(__dirname, 'storage')));

  expressApp.all('*', (req, res) => {
    return handler(req, res);
  });

  const io = new Server(server);

  let activeUsers = new Set();

  io.on('connection', (socket) => {
    activeUsers.add(socket.id);
    console.log('User connected:', activeUsers.size);

    io.emit('activeUsers', activeUsers.size);

    socket.on('disconnect', () => {
      activeUsers.delete(socket.id);
      console.log('User disconnected:', activeUsers.size);

      io.emit('activeUsers', activeUsers.size);
    });

    socket.on('send-message', async (data) => {
      try {
        const response = await socketChat(data);
        io.emit('message', response);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    socket.on('typing', (user) => {
      io.emit('typing', user);
    });

    socket.on('telemetry', (domain) => {
      io.emit('telemetry', domain);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

cron.schedule('0 * * * *', () => {
  console.log('Running scheduled tasks...');
  rewardDevotee();
  rewardVeteran();
  rewardFavorite();
  rewardPeopleChoice();
  rewardProlific();
  rewardWordsmith();
  rewardGenius();
  rewardPolymath();
});
