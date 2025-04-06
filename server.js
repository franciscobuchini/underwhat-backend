// server.js
const express = require('express');
const Database = require('better-sqlite3'); // Cambiado a better-sqlite3
const path = require('path');
const app = express();
const cors = require('cors');

const corsOptions = { origin: 'http://localhost:5174', 'https://underwhat.vercel.app' };
app.use(cors(corsOptions));

// Conectar a la base de datos
const dbPath = path.resolve(__dirname, './database/underwhat.db');
let db;
try {
  db = new Database(dbPath); // conexión sin callbacks
  // console.log('Conexión exitosa a la base de datos SQLite');
} catch (err) {
  console.error('Error al conectar con la base de datos:', err.message);
}

// Ruta para obtener datos desde la base de datos
app.get('/api', (req, res) => {
  try {
    const query = `
      SELECT product_name, product_selling, product_category, product_id, product_image, product_image02
      FROM Products
    `;
    const stmt = db.prepare(query);
    const products = stmt.all(); // no necesita callback
    res.json({ products });
  } catch (err) {
    console.error('Error ejecutando la consulta:', err.message);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
