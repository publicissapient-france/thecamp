'use strict';

const db = require('knex');
const config = require('config');
const bookingTable = config.get('postgres.tables.booking');
const logger = console;

class Postgres {

  constructor() {
    const dbConfig = {
      client: 'pg',
      connection: {
        host: process.env.POSTGRES_HOST || config.get('postgres.host'),
        user: process.env.POSTGRES_USER || config.get('postgres.user'),
        password: process.env.POSTGRES_PASSWORD || config.get('postgres.password'),
        database: process.env.POSTGRES_DB || config.get('postgres.database')
      }
    };
    this.knex = db(dbConfig);
    this.createTable()
      .then(logger.info);
  }

  createTable() {
    return this.knex.schema.createTableIfNotExists(bookingTable, table => {
      table.increments();
      table.uuid('client_id');
      table.string('offer');
      table.date('from');
      table.date('to');
      table.boolean('keynote');
      table.boolean('workshop');
      table.boolean('simpleRoom');
      table.integer('quantity');
      table.float('price');
      table.timestamps();
    });
  }

  addBooking(event) {
    return this.knex(bookingTable).insert(event);
  }

  getBookings() {
    return this.knex(bookingTable).select();
  }

}

const postgres = new Postgres();

module.exports = postgres;
