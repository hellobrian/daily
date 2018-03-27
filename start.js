/**
 * Node Modules
 */
const next = require('next');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Local Modules
 */
const server = require('./server');

/**
 * Mongoose - connect to hosted mongodb @ mlab
 */
dotenv.config({ path: '.env' });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  process.exit();
});
mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database');
});

/**
 * Next.js - setup app
 */
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.get('/', (req, res) => {
    return app.render(req, res, '/');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 1337;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express running → PORT ${port}`);
  });
});
