const express = require('express');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

pool.connect()
	.then(() => {
		console.log('Connecté à la base de données PostgreSQL');

		app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		});

		app.listen(port, () => {
			console.log(`Serveur en écoute sur le port ${port}`);
		});
	})
	.catch(error => {
		console.error('Erreur lors de la connexion à la base de données PostgreSQL:', error);
		process.exit(1);
});

app.get('/data', (req, res) => {
	pool.query('SELECT * FROM users', (error, results) => {
		if (error) {
			console.error('Erreur lors de la requête SQL:', error);
			res.status(500).json({ error: 'Erreur lors de la requête SQL' });
			return;
		}
		res.json(results.rows);
	});
});
