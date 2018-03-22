const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', routes);

module.exports = app;
