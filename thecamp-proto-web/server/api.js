const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
// const config = require('config');
// const logger = require('../logger');
const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap
const rabbitMQ = require('./rabbitMQ');

router.post('/booking', bodyParser.json(), (req, res) => {
  return rabbitMQ.postMessage({ type: 'BOOKING_EVENT_REQUEST', payload: req.body })
    .then(() => res.status(201).end())
    .catch(err => res.status(503).send(err));
});

module.exports = router;
