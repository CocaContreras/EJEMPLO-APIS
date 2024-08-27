const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

// Importar modelos
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Book = require('../models/books.model.js')(sequelize, Sequelize);
db.Prestamo = require('../models/prestamos.model.js')(sequelize, Sequelize);

// Establecer asociaciones
db.Book.hasMany(db.Prestamo, { foreignKey: 'bookcode' });
db.Prestamo.belongsTo(db.Book, { foreignKey: 'bookcode' });

module.exports = db;
