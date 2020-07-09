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
  let createdDate = new Date();

  client.query("INSERT INTO " +  
    "salesforce.contact(Name, Custom_Form__c, Customer_ID__c, Status_Text__c, Type__c, Empresa__c, Nombre_Empresa__c, Ocupacion__c, " + 
      "Pais_de_Trabajo__c, Ciudad_de_Trabajo__c, Direcci_n_Trabajo__c, Individual__c, Nombres__c, Apellidos__c, Nombre_Empresa_2__c, Nombre_Legal__c, Parent_Company__c, " +
      "Categoria_Oracle__c, TipoIdentificacion__c, NumeroIdentificacion__c, Birthdate, Genero_Text__c, Estado_Civil__c, Nombre_Padre__c, Nombre_Madre__c, " +
      "Email, Telefono_Oracle__c, Phone, MobilePhone, OtherPhone, Fax_Oracle__c, Subsidiaria__c, Fecha_Caducidad_Tarjeta__c, Nombre_Titular_Tarjeta__c, Pais_Cliente_Oracle__c, " +
      "Tipo_Tarjeta__c, Numero_Tarjeta__c, Currency_Oracle__c, Pais_Cliente_Oracle_2__c, Department, Ciudad_Tutor__c, Distrito__c, " +
      "Direccion_de_Casa__c, Otra_Direccion__c, Internal_ID_Oracle__c, CreatedDate, Id, IsDeleted, SystemModstamp, LastName)" +

    "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34," +
      "$35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50) RETURNING *", 
    
    [req.body.custentity_internal_id_saleforce, req.body.customform, req.body.entityid, req.body.entitystatus, req.body.isperson, req.body.company,
      req.body.custentity_empresa_trabaj, req.body.custentity_ocupacio, req.body.custentity_pais_de_empres, req.body.custentity_ciudad_empres, 
      req.body.custentity_direccion_empres, req.body.individua, req.body.firstnam, req.body.lastname,
      req.body.companyname, req.body.custentity_legal_name, req.body.parent, req.body.category, req.body.custentity_tipo_identifiacion, 
      req.body.custentity_numero_identificacion, req.body.custentity_fecha_nacimiento, req.body.custentity_genero, req.body.custentity_estado_civil,
      req.body.custentity_nombre_padre, req.body.custentity_nombre_madre, req.body.email, req.body.phone, req.body.homephone, req.body.mobilephone, req.body.altphone,
      req.body.fax, req.body.subsidiary, req.body.custentity_fecha_caducidad_tarjeta, req.body.custentity_nombre_titular_tarjeta,
      req.body.custentity_pais_cliente, req.body.custentity_tipo_tarjeta, req.body.custentity_numero_tarjeta_credito, req.body.currency,
      req.body.country, req.body.custrecord_departamento, req.body.custrecord_ciudad, req.body.custrecord_distrito, req.body.addr1,
      req.body.addr2, req.body.internalid, createdDate, req.body.custentity_internal_id_saleforce, false, createdDate, req.body.lastname], 

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
    "salesforce.factura__c(Custom_Form__c, Customer_Project__c, Estado_Aprobaci_n__c, Date__c, Orden_Exenta__c, Codigo_registro_exonerado__c, " + 
      "Registro_SAG__c, Cajero__c, Name, Internal_ID_Oracle__c, Subsidiaria__c, Departamento__c," +
      "Class_Text__c, Location__c, CurrencyOracle__c, Item__c, Quantity__c, Price_Level__c, Rate__c, " +
      "Tax_Code_Text__c, Categoria_Item__c, Sub_Categoria_Item__c, Familia_Item__c, Segmento_de_Negocio__c, " +
      "req.body.custbody_correlativo, req.body.custbody_cai, CreatedDate, Id, IsDeleted, SystemModstamp) " +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) RETURNING *", 
    
    [req.body.customform, req.body.entity, req.body.approvalstatus, req.body.trandate, req.body.custbody_no_oc_exenta,
      req.body.custbody_no_const_regis_exonerado, req.body.custbody_no_registro_sag, req.body.custbody_cajero, req.body.custbody_internal_id_saleforce, 
      req.body.Internalid, req.body.subsidiary, req.body.department, req.body.class, req.body.location, req.body.currency, req.body.item, req.body.quantity,
      req.body.price, req.body.rate, req.body.taxcode, req.body.cseg_categ_item, req.body.cseg_sub_cat, req.body.cseg_familia_ite, req.body.cseg_segm_neg,
      req.body.Correlativo__c, req.body.CAI__c, createdDate, req.body.custbody_internal_id_saleforce, false, createdDate], 
    
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
    "salesforce.producto__c(Cantidad__c, Class_Text__c, CreatedDate, Cseg_Categ_Item_Text__c, Cseg_Familia_Item_Text__c, Cseg_Segm_Neg_Text__c, Cseg_Sub_Cat_Text__c, Department_Text__c, Descripcion__c, Unit_Type_Text__c," + 
      "Descuento_Oracle__c, Id, Internal_ID_Oracle__c, IsDeleted, Item_Name_Number__c, Location_Text__c, Name, Precio__c, Rate__c, Subsidiary_Text__c, SystemModstamp, Tax_Code_Text__c, UPC_Code__c)" +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *", 
    
    [req.body.Cantidad__c, req.body.Class_Text__c, createdDate, req.body.Cseg_Categ_Item_Text__c, req.body.Cseg_Familia_Item_Text__c, req.body.Cseg_Segm_Neg_Text__c, req.body.Cseg_Sub_Cat_Text__c, 
      req.body.Department_Text__c, req.body.Descripcion__c, req.body.Unit_Type_Text__c, req.body.Descuento_Oracle__c, req.body.Name, req.body.Internal_ID_Oracle__c, false, req.body.Item_Name_Number__c, req.body.Location_Text__c, req.body.Name, 
      req.body.Precio__c, req.body.Rate__c, req.body.Subsidiary_Text__c, createdDate, req.body.Tax_Code_Text__c, req.body.UPC_Code__c], 
    
    (err, data) => {
      if (err) {
        console.log(err);
        response.status(400).send(err);
      } else {
        response.send(data.rows[0]);
      }
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Debito
app.get('/debito', (req, res)=>{
  client.query('SELECT * FROM salesforce.nota_de_debito__c', (err, data)=>{
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/debito', (req, res) => {
  let createdDate = new Date();

  client.query("INSERT INTO " +
    "salesforce.nota_de_debito__c(Custom_Form_Text__c, Customer_Project__c, Approbal_Status__c, Date__c, Cajero_Texto__c, No_O_C_Exenta__c, " +
      "No_Const_Registro_Exonerados__c, Correlativo__c, CAI__c, Registro_SAG__c, Memo__c, Name, Internal_ID_Oracle__c, Subsidiary_Text__c, " +
      "Department_Text__c, Class_Text__c, Location_Text__c, Currency_Oracle__c, Item__c, Quantity__c, " +
      "Price_Level__c, Rate__c, Taxcode_Text__c, Cseg_Categ_Item_Text__c, Cseg_Sub_Cat_Text__c, Cseg_Familia_Ite_Text__c, Cseg_Segm_Neg_Text__c, CreatedDate, " +
      "Id, IsDeleted, SystemModstamp) " +

    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31) RETURNING *", 
    
    [  req.body.customform, req.body.entity, req.body.approvalstatus, req.body.trandate, req.body.custbody_cajero, req.body.custbody_no_oc_exenta,
      req.body.custbody_no_const_regis_exonerado, req.body.custbody_correlativo, req.body.custbody_cai, req.body.custbody_no_registro_sag, req.body.memo,
      req.body.custbody_internal_id_saleforce, req.body.Internalid, req.body.subsidiary, req.body.department, req.body.class, req.body.location,
      req.body.currency, req.body.item, req.body.quantity, req.body.price, req.body.rate, req.body.taxcode,
      req.body.cseg_categ_item, req.body.cseg_sub_cat, req.body.cseg_familia_ite, req.body.cseg_segm_neg, createdDate,
      req.body.custbody_internal_id_saleforce, false, createdDate], 
    
    (err, data) => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(data.rows[0]);
    }
  });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Credito
app.get('/credito', (req, res)=>{
  client.query('SELECT * FROM salesforce.nota_de_credito__c', (err, data)=>{
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(data.rows);
    }
  });
});

app.post('/credito', (req, res) => {
  let createdDate = new Date();

  client.query("INSERT INTO "+ 
    "salesforce.Nota_de_Credito__c(Name, Credit__c, Custom_Form_Text__c, Customer_Project__c, Approbal_Status__c, Date__c, " +
      "Cajero_Text__c, Memo__c, Internal_ID_Oracle__c, Subsidiary_Text__c, Department_Text__c, Class_Text__c, " +
      "Location_Text__c, Currency_Oracle__c, Item__c, Quantity__c, Price_Level__c, Rate__c, Tax_Code_Text__c, " +
      "Apply__c, Payment__c, Cseg_Categ_Item_Text__c, Cseg_Sub_Cat_Text__c, Cseg_Familia_Ite_Text__c, Cseg_Segm_Neg_Text__c, " +
      "CreatedDate, Id, IsDeleted, SystemModstamp) " +
    
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING*",
    
    [req.body.custbody_internal_id_saleforce, req.body.credit, req.body.customform, req.body.entity, req.body.approvalstatus,
      req.body.trandate, req.body.custbody_cajero, req.body.memo, req.body.Internalid, req.body.subsidiary, req.body.department,
      req.body.class, req.body.location, req.body.currency, req.body.item, req.body.quantity, req.body.price,
      req.body.rate, req.body.taxcode, req.body.apply, req.body.amount, req.body.cseg_categ_item, req.body.cseg_sub_cat,
      req.body.cseg_familia_ite, req.body.cseg_segm_neg, createdDate, req.body.custbody_internal_id_saleforce, false, createdDate],
    
    (err, data) => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(data.rows[0]);
    }
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/correlativos', (req, res) => {
  console.log("BODY: ", req.body); 
  if(req.body.tipo === 'factura') {
    client.query('UPDATE salesforce.factura__c SET Correlativo__c=($2), CAI__c=($3), custbody_rango_autorizacion_desde__c=($4),' +
    'custbody_rango_autorizacion_hasta__c=($5) WHERE Name=($1)',
      [req.body.internal_id_saleforce, req.body.correlativo, req.body.cai, req.body.custbody_rango_autorizacion_desde, 
        req.body.custbody_rango_autorizacion_hasta], (err, data) => {
      if(err){
        res.json({type: "factura", operation: 'failed'});
      } else {
        res.json({type: "factura", operation: 'success'});
      }
    });
  } else if(req.body.tipo === 'notacredito') {
    client.query('UPDATE salesforce.factura__c SET Correlativo__c=($2), CAI__c=($3), custbody_rango_autorizacion_desde__c=($4),' +
    'custbody_rango_autorizacion_hasta__c=($5) WHERE Name=($1)',
    [req.body.internal_id_saleforce, req.body.correlativo, req.body.cai, req.body.custbody_rango_autorizacion_desde, 
      req.body.custbody_rango_autorizacion_hasta], (err, data) => {
      if(err){
        res.json({type: "notacredito", operation: 'failed'});
      } else {
        res.json({type: "notacredito", operation: 'success'});
      }
    });
  } else if(req.body.tipo === 'notadebito') {
    client.query('UPDATE salesforce.factura__c SET Correlativo__c=($2), CAI__c=($3), custbody_rango_autorizacion_desde__c=($4),' +
    'custbody_rango_autorizacion_hasta__c=($5) WHERE Name=($1)',
    [req.body.internal_id_saleforce, req.body.correlativo, req.body.cai, req.body.custbody_rango_autorizacion_desde, 
      req.body.custbody_rango_autorizacion_hasta], (err, data) => {
      if(err){
        res.json({type: "notadebito", operation: 'failed'});
      } else {
        res.json({type: "notadebito", operation: 'success'});
      }
    });
  }else {
    res.json({type: "Tipo Desconocido", operation: 'failed'});
  }
});

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

  /**/