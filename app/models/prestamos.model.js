module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamos', {
      numero_de_pedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      bookcode: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'bookcode'
        }
      },
      usercode: {
        type: Sequelize.INTEGER
      },
      fecha_de_salida: {
        type: Sequelize.DATE
      },
      fecha_max_devolver: {
        type: Sequelize.DATE
      },
      fecha_devolucion: {
        type: Sequelize.DATE
      }
    });
  
    Prestamo.belongsTo(sequelize.models.books, { foreignKey: 'bookcode' });
    return Prestamo;
  };