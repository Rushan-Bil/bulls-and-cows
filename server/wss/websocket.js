const { WebSocket } = require('ws');

const decoder = new TextDecoder('utf-8');
const gameController = require('../controllers/GameController');
const { Game, GamesAndUser } = require('../db/models');

const games = {};
let searching = [];

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
    console.log(socket.id, 'CONNECTION');
    socket.send('CONNECTION');
    socket.on('message', async (info) => {
      const { type, payload } = JSON.parse(decoder.decode(new Uint8Array(info)));
      const {
        userId, gameId, word, language,
      } = payload;
      switch (type) {
        case 'SEARCHING_GAME':
          socket.id = userId;
          const opp = searching.filter((opp) => opp.word.length === word.length && opp.language === language && opp.userId !== userId)[0];
          if (!opp) {
            const index = searching.findIndex((item) => item.userId === userId);
            if (index === -1) {
              searching.push({
                userId, language, word,
              });
            } else {
              searching[index].language = language;
              searching[index].word = word;
            }
            console.log('SEARCHING');
            return socket.send(JSON.stringify({ type: 'SEARCHING' }));
          }
          console.log('PODBOR SOPERNIKA', searching);
          searching = searching.filter((item) => item.userId !== opp.userId || item.userId !== userId);
          const newGame = await Game.create({ winner: null, status: 'START' });
          await GamesAndUser.create({ game_id: newGame.id, user_id: userId });
          await GamesAndUser.create({ game_id: newGame.id, user_id: opp.userId });
          const currentTurn = [userId, opp.userId][Math.floor(Math.random() * 2)];
          games[newGame.id] = {
            status: 'active',
            winner: null,
            language,
            currentTurn,
            users: {
              [userId]: {
                secret: opp.word,
                words: [],
              },
              [opp.userId]: {
                secret: word,
                words: [],
              },
            },
          };
          wss.clients.forEach((client) => {
            if (client.id === userId || client.id === opp.userId) {
              client.send(JSON.stringify({ type: 'CONNECTED_GAME', payload: { gameId: newGame.id, currentTurn } }));
            }
          });
          break;
        case 'ADD_WORD':
          const game = games[gameId];
          const currentUser = game.users[userId];
          const { secret } = currentUser;
          const bullsAndCows = gameController.countBullandCows(word, secret);
          console.log(bullsAndCows);
          currentUser.words.push(bullsAndCows);
          let gameCurrentTurn = game.currentTurn;
          for (const key in game.users) {
            if (game.currentTurn !== userId) gameCurrentTurn = key;
          }

          if (bullsAndCows.bulls === secret.length) {
            wss.clients.forEach((client) => {
              if (client.id in game.users) {
                client.send(JSON.stringify({ type: 'ADD_WORD', payload: { word: bullsAndCows, userId } }));
                client.send(JSON.stringify({ type: 'FINISH_GAME', payload: { word: bullsAndCows, winner: userId } }));
              }
            });
          } else {
            wss.clients.forEach((client) => {
              if (client.id in game.users) {
                client.send(JSON.stringify({ type: 'ADD_WORD', payload: { word: bullsAndCows, userId } }));
              }
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
