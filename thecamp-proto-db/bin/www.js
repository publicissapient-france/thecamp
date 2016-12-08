#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

const middleware = require('../lib/middleware');
const logger = require('../lib/utils').logger;
const rabbitMQ = require('../lib/utils').rabbitMQ;
const env = process.env.NODE_ENV;

/**
 * Init the bot(s).
 */

const autoStart = () => {
  const signalHandler = name => {
    let exitCode = 0;
    logger.warn('received signal %s : stopping', name);
    return middleware.stop()
      .then(() => {
        logger.info('Middleware stopped');
        logger.info('closing rabbitMQ connection');
        return rabbitMQ.handler.then(conn => conn.close());
      })
      .catch(err => {
        logger.error(err);
        exitCode = 1;
      })
      .finally(() => {
        process.exit(exitCode);
      });
  };
  logger.info('Starting middleware');
  middleware.start()
    .then(msg => logger.info(msg))
    .catch(err => {
      logger.error(err.stack || err);
      process.exit(1);
    });
  process.on('SIGINT', () => signalHandler('SIGINT'));
  process.on('SIGTERM', () => signalHandler('SIGTERM'));
  if ('development' === env) {
    process.once('SIGUSR2', () => {
      logger.warn('received signal SIGUSR2');
      middleware.stop()
        .then(() => {
          logger.info('bot stopped');
          logger.info('closing rabbitMQ connection');
          return rabbitMQ.handler.then(conn => conn.close());
        })
        .then(() => {
          process.kill(process.pid, 'SIGUSR2');
        })
        .catch(err => {
          logger.error(err);
        });
    });
  } else {
    process.on('SIGUSR2', () => {
      logger.info('received signal SIGUSR2');
      middleware.stop()
        .then(() => middleware.start());
    });
  }
  process.on('uncaughtException', err => {
    logger.error('Caught exception :', err.stack || err);
    process.exit(1);
  });
};

autoStart();
