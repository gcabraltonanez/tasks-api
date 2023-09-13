const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT ? process.env.PORT : 3000);


app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use(require('./routes/index'));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 not found');
  });

module.exports = app;