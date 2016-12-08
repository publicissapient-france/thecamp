'use strict';

module.exports = {
  logger: require('./logger'),
  rabbitMQ: require('./rabbitMQ'),
  database: require('./postgres')
};
