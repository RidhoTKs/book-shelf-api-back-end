const Hapi = require('@hapi/hapi');
require('dotenv').config();
const books = require('./api/books');
const BooksService = require('./services/inMemory/BooksService');

const init = async () => {
  // deklarasi object untuk serice
  const booksService = new BooksService();
  // deklarasi server dan inisiasi nilai untul propertynya
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV === 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: books,
    options: {
      service: booksService,
    },
  });

  // start server
  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
