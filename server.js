const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar la configuración de la base de datos y los modelos
const db = require('./app/config/db.config.js');

// Importar los routers
const router = require('./app/routers/router.js');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configuración de body-parser
app.use(bodyParser.json());

// Configurar las rutas
app.use('/', router);

// Mensaje de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Sincronizar la base de datos
db.sequelize.sync({ force: false }).then(() => { // Cambié force: true a force: false para evitar la eliminación de datos existentes
  console.log('Base de datos sincronizada.');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

// Crear un servidor
const server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
