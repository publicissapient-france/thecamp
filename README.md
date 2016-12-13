# TheCamp Extreme Architecture

## Description

### Checkout project

`$ git clone https://github.com/xebia-france/thecamp.git`

### Directory

- thecamp-proto-db

This is a NodeJS middleware acting as database service. It is use to create or get bookings.

- thecamp-proto-web

This is the web application to book an event. On the HomePage we can see all the events already booked.
It's made with React and served by a Node.JS server.

### Docker

All the applications can be build with containers.

`$ docker-compose up -d --build`

## Prerequisites to run locally

### Nodejs V6

Nodejs is required, it can be installed with `brew` (MAC OS) or with `nvm` (recommended) or via exec, pkg etc. The method with `nvm` is recommended because it does not install many files in multiple directory and you can manage your `nodejs` versions easily.

[NVM Github to know how to install it](https://github.com/creationix/nvm)

Those command lines will install `NodeJS v6.9.1` and will this version the defaulted one.

```
$ nvm install 6.9.1
$ nvm alias default 6.9.1
```

## How-to

### RabbitMQ and Postgres Docker images

`docker run --name thecamp-rabbit -e RABBITMQ_DEFAULT_USER=AAAA -e RABBITMQ_DEFAULT_PASS=AAAA -p 5672:5672 -p 15672:15672 -d rabbitmq:3-management`

`docker run --name thecamp-db -e POSTGRES_PASSWORD=AAAA -e POSTGRES_USER=AAAA -e POSTGRES_DB=thecamp_db -d postgres`

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

### Container

- Create a Dockerfile per applications
- Create a `docker-compose.yml` using the 2 Dockerfile and the 2 other images
- Run
