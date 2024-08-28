module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
      bookcode: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      namebook: {
        type: Sequelize.STRING
      },
      editorial: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      pais_del_autor: {
        type: Sequelize.STRING
      },
      numero_de_paginas: {
        type: Sequelize.INTEGER
      },
      fecha_de_edicion: {
        type: Sequelize.DATE
      },
      precio_del_libro: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  
    return Book;
  };
  