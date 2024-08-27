const express = require('express');
const router = express.Router();

const Book = require('../controllers/books.controller.js');

// Rutas para el controlador de Books
router.post('/api/books/create', Book.create);
router.get('/api/books/all', Book.findAll);
router.get('/api/books/onebyid/:id', Book.findById);
router.put('/api/books/update/:id', Book.update);
router.delete('/api/books/delete/:id', Book.delete);


const Prestamo = require('../controllers/prestamos.controller.js');

// Rutas para el controlador de Prestamos
router.post('/api/prestamos/create', Prestamo.create);
router.get('/api/prestamos/all', Prestamo.findAll);
router.get('/api/prestamos/onebyid/:numero_de_pedido', Prestamo.findById);
router.put('/api/prestamos/update/:numero_de_pedido', Prestamo.update);
router.delete('/api/prestamos/delete/:numero_de_pedido', Prestamo.delete);

module.exports = router;
