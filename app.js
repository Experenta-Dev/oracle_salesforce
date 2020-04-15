const express = require('express');
const { Client } = require('pg');
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  let createdDate = new Date();

  client.query("INSERT INTO " +  
    "salesforce.contact(Apellidos__c, Birthdate, CargoEmpresa__c, Ciudad_Tutor__c, Ciudad_de_Trabajo__c, Codigo_Cliente__c, CreatedDate," +
      "Currency_Oracle__c, Custom_Form__c, Department, Direcci_n_Trabajo__c, Direccion_de_Casa__c, Distrito__c, Email, Empresa__c," +
      "Estado_Civil__c, Estado__c, Fax_Oracle__c, Fecha_Caducidad_Tarjeta__c, HomePhone, Id, Individual__c, IsDeleted, Is_Company__c," +
      "Is_Person__c, LastName, MobilePhone, Name, Nombre_Empresa__c, Nombre_Legal__c, Nombre_Madre__c, Nombre_Padre__c, Nombre_Titular_Tarjeta__c, Nombres__c," +
      "NumeroIdentificacion__c, Numero_Tarjeta__c, Ocupacion__c, OtherPhone, Otra_Direccion__c, Pais_de_Trabajo__c, Pais_de_residencia__c, Parent_Company__c, Phone," + 
      "Subsidiaria__c, SystemModstamp, TipoIdentificacion__c, Tipo_Tarjeta__c, hed__Gender__c, Contact_Ext_Id__c, Categoria_Oracle__c, Pais_Cliente_Oracle__c)" +

    "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34," +
      "$35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51) RETURNING *", 
    
    [req.body.apellidos, req.body.fecha_nacimiento, req.body.ocupacion, req.body.ciudad, req.body.ciudad_empresa, req.body.codigo_cliente, createdDate, 
    req.body.currency, req.body.customform, req.body.departamento, req.body.direccion_empresa, req.body.addr1, req.body.distrito, 
    req.body.email, req.body.empresa_trabaja, req.body.estado_civil, req.body.entitystatus, req.body.fax, 
    req.body.fecha_caducidad_tarjeta, req.body.homephone, req.body.internal_id_saleforce, req.body.individual, req.body.IsDeleted,
    req.body.is_company, req.body.is_person, req.body.apellidos, req.body.mobilephone, req.body.Name, req.body.companyname, 
    req.body.legal_name, req.body.nombre_madre, req.body.nombre_padre, req.body.nombre_titular_tarjeta, 
    req.body.nombres, req.body.numero_identificacion, req.body.numero_tarjeta_credito, req.body.ocupacion,
    req.body.altphone, req.body.addr2, req.body.pais_de_empresa, req.body.country, req.body.parent, req.body.phone, req.body.subsidiary,
    createdDate, req.body.tipo_identifiacion, req.body.tipo_tarjeta, req.body.genero, req.body.Contact_Ext_Id__c, req.body.category, req.body.pais_cliente], 

    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.send(data.rows[0]);
      }
  });
});

app.delete('/clients/:sfid', function(req, res) {
  client.query('DELETE FROM salesforce.contact WHERE sfid = $1', [req.params.sfid], function(error, data) {
    if (err) {
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
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/factura', (req, response) => {
  let createdDate = new Date();

  client.query("INSERT INTO " + 
    "salesforce.factura__c(Cajero__c, Clase__c, Codigo_registro_exonerado__c, CreatedDate, CurrencyOracle__c, Custom_Form__c, Departamento__c, Emisi_n_Factura__c, Estado_Aprobaci_n__c," + 
    "Id, IsDeleted, Location__c, Name, Orden_Exenta__c, Raz_n_Social__c, Registro_SAG__c, Subsidiaria__c, SystemModstamp, Factura_Ext_Id__c)" +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *", 
    
    [req.body.cajero, req.body.class, req.body.no_const_regis_exonerado, createdDate, req.body.currency, req.body.customform, req.body.department,
    req.body.trandate, req.body.approvalstatus, req.body.id_salesforce, req.body.IsDeleted, req.body.location, req.body.Name, req.body.no_oc_exenta, req.body.entity,
    req.body.no_registro_sag, req.body.subsidiary, createdDate, req.body.Factura_Ext_Id__c], 
    
    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.send(data.rows[0]);
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
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/productos', (req, response) => {
  let createdDate = new Date();

  client.query("INSERT INTO " + 
    "salesforce.producto__c(Cantidad__c, Class__c, CreatedDate, Cseg_Categ_Item__c, Cseg_Familia_Item__c, Cseg_Segm_Neg__c, Cseg_Sub_Cat__c, Department__c, Descripcion__c, Unit_Type__c," + 
      "Descuento_Oracle__c, Id, Internal_ID_Oracle__c, IsDeleted, Item_Name_Number__c, Location__c, Name, Precio__c, Rate__c, Subsidiary__c, SystemModstamp, Tax_Code__c, UPC_Code__c)" +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *", 
    
    [req.body.Cantidad__c, req.body.Class__c, createdDate, req.body.Cseg_Categ_Item__c, req.body.Cseg_Familia_Item__c, req.body.Cseg_Segm_Neg__c, req.body.Cseg_Sub_Cat__c, req.body.Department__c, req.body.Descripcion__c, 
      req.body.Unit_Type__c, req.body.Descuento_Oracle__c, req.body.Name, req.body.Internal_ID_Oracle__c, false, req.body.Item_Name_Number__c, req.body.Location__c, req.body.Name, req.body.Precio__c, req.body.Rate__c, 
      req.body.Subsidiary__c, createdDate, req.body.Tax_Code__c, req.body.UPC_Code__c], 
    
    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.send(data.rows[0]);
      }
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// inicializar
app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
  });

  /*
   * Subsidiary
   * Department
   * Class
   * Location
   * Custom Form
   * Category
   * Genero
   * Estado Civil
   * Tipo de Tarjeta
   * Tax Code
   * Currency
   * Cajero
   * Cseg_Sub_Cat
   * Cseg_Categ_Item
   * Cseg_Familia_Ite
   * Cseg_Segm_Neg
   */