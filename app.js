const express = require('express');
const pg = require('pg');
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar conexión, middlewares y rutas


// inicializar
app.listen(PORT, () => {
    console.log("Listening...");
  });