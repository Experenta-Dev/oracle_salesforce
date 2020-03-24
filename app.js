const express = require('express');
const { Client } = require('pg');
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Configurar conexión, middlewares y rutas
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect( () =>{
  console.log('Connected');
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Clientes
app.get('/clients', (req, res)=>{
  client.query('SELECT * FROM salesforce.contact', (err, data)=>{
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.get('/clients/:id', (req, res)=>{
  client.query('SELECT * FROM salesforce.contact WHERE id = $1', [req.params.id], (err, data)=>{
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data.rows[0]);
    }
  });
});

app.post('/clients', (req, response) => {
  client.query("INSERT INTO" +  
    "salesforce.contact(Apellidos__c, Birthdate, CargoEmpresa__c, Ciudad_Tutor__c, Ciudad_de_Trabajo__c, Codigo_Cliente__c, CreatedDate," +
      "Currency_Oracle__c, Custom_Form__c, Department, Direcci_n_Trabajo__c, Direccion_de_Casa__c, Distrito__c, Email, Empresa__c," +
      "Estado_Civil__c, Estado__c, Fax_Oracle__c, Fecha_Caducidad_Tarjeta__c, HomePhone, Id, Individual__c, IsDeleted, Is_Company__c" +
      "Is_Person__c, LastName, MobilePhone, Name, Nombre_Empresa__c, Nombre_Legal__c, Nombre_Madre__c, Nombre_Padre__c, Nombre_Titular_Tarjeta__c, Nombres__c" +
      "NumeroIdentificacion__c, Numero_Tarjeta__c, Ocupacion__c, OtherPhone, Otra_Direccion__c, Pais_de_Trabajo__c, Pais_de_residencia__c, Parent_Company__c, Phone" + 
      "Subsidiaria__c, SystemModstamp, TipoIdentificacion__c, Tipo_Tarjeta__c, hed__Gender__c)" +

    "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34" +
      "$35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49)", 
    
    [req.body.Apellidos__c, req.body.Birthdate, req.body.CargoEmpresa__c, req.body.Ciudad_Tutor__c, req.body.Ciudad_de_Trabajo__c, req.body.Codigo_Cliente__c, req.body.CreatedDate,
    req.body.Currency_Oracle__c, req.body.Custom_Form__c, req.body.Department, req.body.Direcci_n_Trabajo__c, req.body.Direccion_de_Casa__c, req.body.Distrito__c, req.body.Email, req.body.Empresa__c,
    req.body.Estado_Civil__c, req.body.Estado__c, req.body.Fax_Oracle__c, req.body.Fecha_Caducidad_Tarjeta__c, req.body.HomePhone, req.body.Id, req.body.Individual__c, req.body.IsDeleted,
    req.body.Is_Company__c, req.body.Is_Person__c, req.body.LastName, req.body.MobilePhone, req.body.Name, req.body.Nombre_Empresa__c, req.body.Nombre_Legal__c, req.body.Nombre_Madre__c,
    req.body.Nombre_Padre__c, req.body.Nombre_Titular_Tarjeta__c, req.body.Nombres__c, req.body.NumeroIdentificacion__c, req.body.Numero_Tarjeta__c, req.body.Ocupacion__c,
    req.body.OtherPhone, req.body.Otra_Direccion__c, req.body.Pais_de_Trabajo__c, req.body.Pais_de_residencia__c, req.body.Parent_Company__c, req.body.Phone, req.body.Subsidiaria__c,
    req.body.SystemModstamp, req.body.TipoIdentificacion__c, req.body.Tipo_Tarjeta__c, req.body.hed__Gender__c], 

    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.json(data);
      }
  });
});

app.delete('/clients/:sfid', function(req, res) {
  client.query('DELETE FROM salesforce.contact WHERE sfid = $1', [req.params.sfid], function(error, data) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data);
    }
  });
});


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Facturas
app.get('/factura', (req, res)=>{
  client.query('SELECT * FROM salesforce.factura__c', (err, data)=>{
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/factura', (req, response) => {
  client.query("INSERT INTO" + 
    "salesforce.factura__c(Cajero__c, Clase__c, Codigo_registro_exonerado__c, CreatedDate, CurrencyOracle__c, Custom_Form__c, Departamento__c, Emisi_n_Factura__c, Estado_Aprobaci_n__c" + 
    "Id, IsDeleted, Location__c, Name, Orden_Exenta__c, Raz_n_Social__c, Registro_SAG__c, Subsidiaria__c, SystemModstamp)" +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)", 
    
    [req.body.Cajero__c, req.body.Clase__c, req.body.Codigo_registro_exonerado__c, req.body.CreatedDate, req.body.CurrencyOracle__c, req.body.Custom_Form__c, req.body.Departamento__c,
    req.body.Emisi_n_Factura__c, req.body.Estado_Aprobaci_n__c, req.body.Id, req.body.IsDeleted, req.body.Location__c, req.body.Name, req.body.Orden_Exenta__c, req.body.Raz_n_Social__c,
    req.body.Registro_SAG__c, req.body.Subsidiaria__c, req.body.SystemModstamp], 
    
    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.json(data);
      }
  });
});

app.delete('/factura/:sfid', function(req, res) {
  client.query('DELETE FROM salesforce.factura__c WHERE sfid = $1', [req.params.sfid], function(error, data) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data);
    }
  });
});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Products
app.get('/productos', (req, res)=>{
  client.query('SELECT * FROM salesforce.producto__c', (err, data)=>{
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/productos', (req, response) => {
  client.query("INSERT INTO" + 
    "salesforce.producto__c(Cantidad__c, Categoria__c, CodigoProducto__c, Codigo_Impuesto__c, CreatedDate, Descuento__c, Familia__c, Id, IsDeleted, Name, Precio__c" + 
    "Segmento_de_Negocio__c, Sub_Categoria__c, SystemModstamp, Valor_Unitario__c)" +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)", 
    
    [req.body.Cantidad__c, req.body.Categoria__c, req.body.CodigoProducto__c, req.body.Codigo_Impuesto__c, req.body.CreatedDate, req.body.Descuento__c, req.body.Familia__c, req.body.Id,
    req.body.IsDeleted, req.body.Name, req.body.Precio__c, req.body.Segmento_de_Negocio__c, req.body.Sub_Categoria__c, req.body.SystemModstamp, req.body.Valor_Unitario__c], 
    
    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.json(data);
      }
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// inicializar
app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
  });