const express = require('express');
const bodyParser = require('body-parser');
const goalApiRoutes = require('./api/goal/goal.routes');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/goals', goalApiRoutes);

module.exports = app;
