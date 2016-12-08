'use strict';

const Promise = require('bluebird');
const events = require('events');
const config = require('config');
const _ = require('lodash');
const database = require('./utils').database;
const logger = require('./utils').logger;
const rabbitMQ = require('./utils').rabbitMQ;

const BOOKING_EVENT_REQUEST = 'BOOKING_EVENT_REQUEST';
const GET_BOOKINGS_SSE = 'GET_BOOKINGS_SSE';

class Middleware {
  constructor() {
    this.eventEmitter = new events.EventEmitter();
    this.middlewareConfig = {};
    this.initialized = false;
    this.started = false;
    rabbitMQ.subscribeQueue(this.manageMessage.bind(this));
  }

  on(...args) {
    this.eventEmitter.on(...args);
  }

  init(opt = {}) {
    _.extend(this.middlewareConfig, config.get('middleware'), opt);
    this.initialized = true;
    logger.info('Middleware initialized');
    return Promise.resolve();
  }

  start(opt) {
    if (!this.initialized) {
      this.init(opt);
    }
    if (this.started) {
      return Promise.resolve('Middleware already started');
    }

    return Promise.resolve()
      .then(() => {
        this.started = true;
        logger.debug('Middleware started');
        return `Middleware started with pid = ${process.pid}`;
      })
      .catch(err => {
        logger.error(err);
      });
  }

  stop(cb) {
    this.started = false;
    logger.debug('twitter bot stopped');
    return Promise.resolve('twitter bot stopped')
      .asCallback(cb);
  }

  manageMessage(event) {
    return Promise.resolve()
      .then(() => {
        try {
          const action = JSON.parse(event);
          logger.debug('RabbitMQ msg:', action);
          switch (action.type) {
            case BOOKING_EVENT_REQUEST:
              return database.addBooking(action.payload)
                .then(() => database.getBookings())
                .then(bookings => this.sendMessage({ type: GET_BOOKINGS_SSE, payload: bookings }));
            default:
              return logger.info('got a msg');
          }
        } catch (err) {
          logger.error(err);
        }
      });
  }

  // noinspection JSMethodCanBeStatic
  sendMessage(action) {
    return rabbitMQ.postMessage(action);
  }

}

const middleware = new Middleware();

module.exports = middleware;
