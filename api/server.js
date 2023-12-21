const express = require('express');
const { Pool } = require('pg');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: 'Aiko',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.get('/data', (req, res) => {
	pool.query('SELECT * FROM users', (error, results) => {
	if (error)
		throw error;
	res.json(results.rows);
	});
});
  
app.listen(port, '0.0.0.0', () => {
	console.log(`Serveur en écoute sur le port ${port}`);
});