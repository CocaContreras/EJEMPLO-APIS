const db = require('../config/db.config.js');
const Book = db.Book;

// Crear un nuevo libro
exports.create = (req, res) => {
    let book = {};

    try {
        book.bookcode = req.body.bookcode;
        book.namebook = req.body.namebook;
        book.editorial = req.body.editorial;
        book.autor = req.body.autor;
        book.genero = req.body.genero;
        book.pais_del_autor = req.body.pais_del_autor;
        book.numero_de_paginas = req.body.numero_de_paginas;
        book.año_de_edicion = req.body.año_de_edicion;
        book.precio_del_libro = req.body.precio_del_libro;

        Book.create(book).then(result => {
            res.status(200).json({
                message: "Uploaded successfully a book with id = " + result.id,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

// Recuperar todos los libros
exports.findAll = (req, res) => {
    Book.findAll()
        .then(books => {
            res.status(200).json({
                message: "Get all books' Infos Successfully!",
                books: books
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Encontrar un libro por Id
exports.findById = (req, res) => {
    Book.findByPk(req.params.id)
        .then(book => {
            res.status(200).json({
                message: "Successfully retrieved a book with id = " + req.params.id,
                book: book
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Actualizar un libro por Id
exports.update = (req, res) => {
    let id = req.params.id;
    Book.update(req.body, { where: { id: id } })
        .then(() => {
            res.status(200).json({
                message: "Updated successfully a book with id = " + id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error -> Cannot update a book with id = " + id,
                error: error.message
            });
        });
}


exports.delete = (req, res) => {
    let id = req.params.id;
    Book.destroy({ where: { id: id } })
        .then(() => {
            res.status(200).json({
                message: "Deleted successfully a book with id = " + id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error -> Cannot delete a book with id = " + id,
                error: error.message
            });
        });
}
