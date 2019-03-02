const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('winston');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);

module.exports = app;
