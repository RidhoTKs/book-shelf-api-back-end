class BooksHandler {
  constructor(service) {
    this._service = service;

    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.putBookByIdHandler = this.putBookByIdHandler.bind(this);
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this);
  }

  // method posthandler untuk menangani request tambah data
  postBookHandler(request, h) {
    /**
     * karena this._service.addBook dapat mengambalikan error
     * maka sebaiknya kita panggil method tersebut dalam block try cath
     */
    try {
      // dapatkan return bookId dengan memanggil method addBook dari service
      const bookId = this._service.addBook(request.payload);
      // kembalikan response dengan memanggil object response
      const response = h.response({
        status: 'success',
        message: 'buku berhasil ditambahkan',
        data: {
          bookId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      /**
       * kembalikan juga response ketika
       * proses input buku dengan pemanggilan this._service.addBook mengambalikan error
       */
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getBooksHandler() {
    const books = this._service.getBooks();
    return ({
      status: 'success',
      data: {
        books,
      },
    });
  }

  getBookByIdHandler(request, h) {
    /**
     * sama seperti method postBookHandler
     * pemanggilan method this._getBookById(id)
     * dapat mengambalikan error sehingga dipangil dalam blok try catch
     */
    try {
      const { id } = request.params;
      const book = this._service.getBookById(id);

      const response = h.reponse({
        status: 'success',
        data: {
          book,
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(200);
      return response;
    }
  }

  putBookByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editBookById(id, request.payload);

      return ({
        status: 'succcess',
        message: 'Buku berhasil diperbarui',
      });
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteBookByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteBookById(id);

      return ({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);

      return response;
    }
  }
}

module.exports = { BooksHandler };
