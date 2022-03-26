const { nanoid } = require('nanoid');

// deklarasi kelas
class BooksService {
  constructor() {
    this._books = [];
  }

  // method untuk menambahkan data buku
  addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    // dapatkan id untuk buku yang akan disimpan dengan package nanoid
    // dapatkan property finished dari perbandingan pageCOunt dan readPage
    // dapatkan tanggal insert dan update dengan new Date() object
    const bookId = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    // buat object berisikan property yang sudah di buat
    // untuk dimasukkan kedalam property thi._books
    const book = {
      bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updateAt,
    };

    this._books.push(book);

    // cek apakah buku berhasil dimasukkan
    const isSuccess = this._books.filter((value) => value.bookId === bookId).length > 0;

    if (isSuccess <= 0) {
      throw new Error('Buku gagal dimasukkan');
    }

    return bookId;
  }

  getBooks() {
    return this._books;
  }

  getBookById(id) {
    const book = this._books.find((value) => value.bookId === id);

    if (!book) {
      throw new Error('Buku tidak ditemukan');
    }

    return book;
  }

  // method edit akan menerima parameter id yang di dapatkan dari request.params
  // dan parameter property yang berubah akan diterima melalui request.payload
  editBookById(id, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    // cek jika buku yang ingin dirubah berdasarkan id memang ada
    // cek menggunakan findIndex untuk mendapatkan index buku yang dimaksud
    const index = this._books.findIndex((value) => value.bookId === id);

    if (index === -1) {
      throw new Error('Tidak dapat merubah buku, id tidak ditemukan');
    }

    // update nilai dari property updatedAt dan finished jika nilai pageCOunt dan readpage berubah
    const updateAt = new Date().toISOString();
    const finished = pageCount === readPage;

    this._books[index] = {
      ...this._books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
      finished,
    };
  }

  // method delete menerima parameter id
  deleteBookById(id) {
    // dapatkan index tempat buku berada tujuannya supaya
    // dapat dengan mudah menghapus buku berdasrkan index dengan bantuan method splice
    const index = this._books.findIndex((value) => value.bookId === id);

    if (index === -1) {
      throw new Error('Buku tidak dapat dihapus, id tidak ditemukan');
    }

    this._books.splice(index, 1);
  }
}

module.exports = BooksService;
