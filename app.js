const express = require('express');
const { Client } = require('pg');
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar conexión, middlewares y rutas
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT name, pais_de_trabajo__c, email FROM salesforce.Contact', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log({Contact: row});
    }
    client.end();
  });


// inicializar
app.listen(PORT, () => {
    console.log("Listening...");
  });