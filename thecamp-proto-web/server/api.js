const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true }); // eslint-disable-line new-cap
const rabbitMQ = require('./rabbitMQ');

router.post('/booking', bodyParser.json(), (req, res) =>
  rabbitMQ.postMessage({ type: 'BOOKING_EVENT_REQUEST', payload: req.body })
    .then(() => res.status(201).end())
    .catch(err => res.status(503).send(err))
);

router.get('/booking', (req, res) =>
  rabbitMQ.postMessage({ type: 'GET_BOOKINGS_REQUEST' })
    .then(() => res.status(200).end())
    .catch(err => res.status(503).send(err))
);

module.exports = router;
