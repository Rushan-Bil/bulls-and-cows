const { WebSocket } = require('ws');

const decoder = new TextDecoder('utf-8');
const gameController = require('../controllers/GameController');
const roomController = require('../controllers/roomController');

const rooms = {};

const webSocket = function (expressServer) {
  const wss = new WebSocket.Server({
    noServer: true,
  });
  expressServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit('connection', websocket, request);
    });
  });
  wss.on('connection', (socket) => {
    socket.send('CONNECTION');
    console.log(rooms);
    socket.on('message', async (info) => {
      console.log('MESSAGE');
      const { type, payload } = JSON.parse(decoder.decode(new Uint8Array(info)));
      console.log(type, payload);
      const {
        secret, userId, roomId, word,
      } = payload;
      switch (type) {
        case 'SET_SECRET': {
          rooms[roomId] = { [userId]: { words: [], secret } };
          console.log(rooms);
          return;
        }
        case 'ADD_WORD': {
          const room = rooms[roomId];
          let hiddenWord;
          for (const key in room) {
            if (key !== userId) {
              hiddenWord = room[key].secret;
            }
          }
          console.log(hiddenWord, userId);
          const result = gameController.countBullandCows(word, hiddenWord);
          room[userId]?.words.push(result);
          console.log(room);
          wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'ADD_WORD', payload: { userId, word: result } }));
          });
        }
        default:
          return '';
      }
    });
  });
  wss.on('close', (socket, req) => {
    console.log('close');
  });

  return wss;
};

module.exports = webSocket;
