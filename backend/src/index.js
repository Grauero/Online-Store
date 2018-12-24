const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });
require('./db');
const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  (deets) => {
    console.log(`server on port ${deets.port}`);
  }
);
