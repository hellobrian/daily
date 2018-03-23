const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', routes);

module.exports = app;
