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
      table.string('client');
      table.string('offer');
      table.date('from');
      table.date('to');
      table.boolean('keynote');
      table.boolean('workshop');
      table.boolean('simpleRoom');
      table.integer('quantity');
      table.float('price');
      table.string('rooms');
      table.timestamps();
    });
  }

  addBooking(event) {
    return this.knex(bookingTable).insert(event, ['id', 'quantity']);
  }

  getBookings() {
    return this.knex(bookingTable).select();
  }

  generateRooms(event) {
    const firstRoom = Math.floor(Math.random() * (500 - 100) + 100);
    const roomsTab = [firstRoom];
    for (let i = 1; i < event.quantity; i++) {
      roomsTab.push(firstRoom + i);
    }
    const str = roomsTab.reduceRight((item, old) => `${old}, ${item}`, '');
    const rooms = str.substring(0, str.length - 2);
    return this.knex(bookingTable).where('id', event.id).update({ rooms })
      .then(result => logger.info(result));
  }

}

const postgres = new Postgres();

module.exports = postgres;
