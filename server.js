//server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Importar sqlite3
const path = require('path');
const app = express();
const cors = require('cors');
const corsOptions = { origin: 'http://localhost:5173', };

app.use(cors(corsOptions));

// Conectar a la base de datos
const dbPath = path.resolve(__dirname, '../database/underwhat.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
  }
});


// Ruta para obtener datos desde la base de datos
app.get('/api', (req, res) => {
  const query = 'SELECT product_name, product_selling, product_category, product_id, product_image, product_image02 FROM Products';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
    } else {
      res.json({ products: rows });
    }
  });
});

// Iniciar el servidor
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});