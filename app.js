const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use(morgan('dev'));
app.use(cors({}));

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const crudRouter = require('./routes/crud');

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/v1/orders/', crudRouter);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost/Users', {
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
