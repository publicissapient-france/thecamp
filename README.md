# TheCamp Extreme Architecture

## Description

### Checkout project

`$ git clone xxx --depth`

### Directory

- thecamp-proto-db

This is a NodeJS middleware acting as database service. It is use to create or get bookings.

- thecamp-proto-web

This is the web application to book an event. On the HomePage we can see all the events already booked.
It's made with React and served by a Node.JS server.

### Docker

All the applications can be build with containers.

`$ docker-compose up -d --build`

## How-to

### RabbitMQ and Postgres Docker images

`docker run --name thecamp-rabbit -e RABBITMQ_DEFAULT_USER=xebia -e RABBITMQ_DEFAULT_PASS=xebia2015 -p 5672:5672 -p 15672:15672 -d rabbit`

`docker run --name thecamp-db -e POSTGRES_PASSWORD=xebia2015 -e POSTGRES_USER=xebia -e POSTGRES_DB=thecamp_db -d postgres`

### DB Server

- Create a server
- Listen the RabbitMQ topic/queue
- Handle message the server needs to
- Create a service to CRUD in DB
- Tests

### WebApp

- Create a Webapp with a Server
- Create CRUD API
- Create Home Page
- Create Booking Page
- Implements API calls
- Add SSE (Server Side Event) on server and client
