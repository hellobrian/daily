const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database');
});

const app = require('./app');

app.set('port', process.env.PORT || 1337);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
