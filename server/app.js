require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routes/userRouter');
const gameRouter = require('./routes/gameRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
const webSocket = require('./wss/websocket');

const PORT = process.env.PORT ?? 3001;
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.set('trust proxy', 'https://bulls-and-cows-client.herokuapp.com');
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRouter);
app.use('/game', gameRouter);
app.use(errorMiddleware);

webSocket(app.listen(PORT));
