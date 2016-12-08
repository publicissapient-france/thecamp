/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const api = require('./api');
const app = express();
const rabbitMQ = require('./rabbitMQ');
const SSE = require('express-sse');
const sse = new SSE(['sse set!']);
const logger2 = console;
const GET_BOOKINGS_SSE = 'GET_BOOKINGS_SSE';
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);

app.get('/stream', sse.init);

rabbitMQ.subscribeQueue(msg => {
  try {
    const action = JSON.parse(msg);
    switch (action.type) {
      case GET_BOOKINGS_SSE: {
        // logger2.info('Need to SSE this action', GET_BOOKINGS_SSE);
        // noinspection JSCheckFunctionSignatures
        sse.send(action.payload, 'bookings');
        return;
      }
      default:
        return logger2.info('Not for me');
    }
  } catch (err) {
    logger2.error('Event msg is not correctly formatted');
  }
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
