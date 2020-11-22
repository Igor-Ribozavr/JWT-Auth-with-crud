const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { db, port } = require('./config/config');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({}));

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const refreshRouter = require('./routes/refreshToken');
const logoutRouter = require('./routes/logout');
const crudRouter = require('./routes/crud');

app.use('/api/auth/register', registerRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/refresh-token', refreshRouter);
app.use('/api/auth/logout', logoutRouter);
app.use('/api/v1/orders', crudRouter);


async function start() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Listening port ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
