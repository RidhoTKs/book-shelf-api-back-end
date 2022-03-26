const { BooksHandler } = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.0',
  register: async (server, { service }) => {
    const booksHandle = new BooksHandler(service);
    server.route(routes(booksHandle));
  },
};
