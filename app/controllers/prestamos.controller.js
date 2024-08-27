const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;
const Book = db.Book; // Asegúrate de importar el modelo Book

// Crear un nuevo préstamo
exports.create = async (req, res) => {
    try {
        // Obtener datos del préstamo desde la solicitud
        const { bookcode, usercode, fecha_de_salida, fecha_max_devolver, fecha_devolucion } = req.body;

        // Verificar si el libro existe
        const book = await Book.findOne({ where: { bookcode: bookcode } });
        if (!book) {
            return res.status(404).json({
                message: "El libro con el código proporcionado no existe."
            });
        }

        // Crear el préstamo
        const prestamo = await Prestamo.create({
            bookcode: bookcode,
            usercode: usercode,
            fecha_de_salida: fecha_de_salida,
            fecha_max_devolver: fecha_max_devolver,
            fecha_devolucion: fecha_devolucion
        });

        res.status(200).json({
            message: "Préstamo creado con éxito con número de pedido = " + prestamo.numero_de_pedido,
            prestamo: prestamo
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear el préstamo.",
            error: error.message
        });
    }
};

// Recuperar todos los préstamos
exports.findAll = (req, res) => {
    Prestamo.findAll()
        .then(prestamos => {
            res.status(200).json({
                message: "Préstamos recuperados con éxito.",
                prestamos: prestamos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar los préstamos.",
                error: error
            });
        });
};

// Encontrar un préstamo por su número de pedido
exports.findById = (req, res) => {
    Prestamo.findByPk(req.params.numero_de_pedido)
        .then(prestamo => {
            if (prestamo) {
                res.status(200).json({
                    message: "Préstamo recuperado con éxito con número de pedido = " + req.params.numero_de_pedido,
                    prestamo: prestamo
                });
            } else {
                res.status(404).json({
                    message: "Préstamo no encontrado con número de pedido = " + req.params.numero_de_pedido
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar el préstamo.",
                error: error
            });
        });
};

// Actualizar un préstamo por su número de pedido
exports.update = (req, res) => {
    let numero_de_pedido = req.params.numero_de_pedido;
    Prestamo.update(req.body, { where: { numero_de_pedido: numero_de_pedido } })
        .then(([rowsUpdated]) => {
            if (rowsUpdated > 0) {
                res.status(200).json({
                    message: "Préstamo actualizado con éxito con número de pedido = " + numero_de_pedido
                });
            } else {
                res.status(404).json({
                    message: "Préstamo no encontrado con número de pedido = " + numero_de_pedido
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al actualizar el préstamo.",
                error: error.message
            });
        });
};

// Eliminar un préstamo por su número de pedido
exports.delete = (req, res) => {
    let numero_de_pedido = req.params.numero_de_pedido;
    Prestamo.destroy({ where: { numero_de_pedido: numero_de_pedido } })
        .then(rowsDeleted => {
            if (rowsDeleted > 0) {
                res.status(200).json({
                    message: "Préstamo eliminado con éxito con número de pedido = " + numero_de_pedido
                });
            } else {
                res.status(404).json({
                    message: "Préstamo no encontrado con número de pedido = " + numero_de_pedido
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al eliminar el préstamo.",
                error: error.message
            });
        });
};

