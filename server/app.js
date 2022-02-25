require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routes/userRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT ?? 3001;
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, // access-control-allow-credentials:true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRouter);
app.use(errorMiddleware);

app.listen(PORT);
