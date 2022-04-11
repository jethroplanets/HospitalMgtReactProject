var mysql = require("mysql");
var config = require("./config.js");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

var pool = mysql.createPool(config);

app.post("/user_registration", async function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var dob = req.body.dob;
  var password = req.body.password;

  var sqlQuery = `INSERT INTO user (Name,DOB,Phone,Email,Password) VALUES (?,?,?,?,?)`;

  pool.query(sqlQuery, [name, dob, phone, email, password], (err, result) => {
    if (result) {
      res.send("Registered!");
    }
  });
});

app.post("/user_login", async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var sqlQuery = `SELECT * FROM userrrs WHERE email=? AND password=?`;

  pool.query(sqlQuery, [email, password], (err, result) => {
    if (result.length === 1) {
      if (result[0].Email === email && result[0].Password === password) {
        res.status(200).send({
          status: true,
          data: result,
        });
      } else {
        res.status(-1).send(false);
      }
    }
  });
});

app.post("/register_medicine", async function (req, res) {
  var medicine_name = req.body.medicine_name;
  var quantity = req.body.quantity;
  

  var sqlQueryMedi = `INSERT INTO medicine (medicine_name, quantity) VALUES (?,?)`;

  pool.query(sqlQueryMedi, [medicine_name, quantity], (err, result) => {
    if (result) {
      res.send("Medicine Successfully Registered!");
    }
  });
});


app.post("/register_doctors", async function (req, res) {
  var doctor_name = req.body.doctor_name;
  

  var sqlQueryDoc = `INSERT INTO doctor (doctor_name) VALUES (?)`;

  pool.query(sqlQueryDoc, [doctor_name], (err, result) => {
    if (result) {
      res.send("Doctor Successfully Registered!");
    }
  });
});

app.post("/register_patients", async function (req, res) {
  var patientName = req.body.patientName;
  

  var sqlQueryPat = `INSERT INTO patient (patientName) VALUES (?)`;

  pool.query(sqlQueryPat, [patientName], (err, result) => {
    if (result) {
      res.send("Patient Successfully Registered!");
    }
  });
});

// medicine   
app.get("/get_medicine", async function (req, res) {
  var sqlQuery = `SELECT * FROM medicine`;
  pool.query(sqlQuery, (err, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// patient   
app.get("/get_patient", async function (req, res) {
  var sqlQuery = `SELECT * FROM patient`;
  pool.query(sqlQuery, (err, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// doctor   
app.get("/get_doctor", async function (req, res) {
  var sqlQuery = `SELECT * FROM doctor`;
  pool.query(sqlQuery, (err, result) => {
    if (result) {
      res.json(result);
    }
  });
});

app.post("/remove_doctors", async function (req, res) {
  var doctor_name = req.body.doctor_name;
  
  var sqlQuery = `DELETE FROM doctor WHERE doctor_id=?`;
  pool.query(sqlQuery, [doctor_name], (err, result) => {
    if (err) {
    }
  });
});

app.post("/delete_medicine", async function (req, res) {
  var medicine_name = req.body.medicine_name;
  
  var sqlQuery = `DELETE FROM medicine WHERE medicine_id=?`;
  pool.query(sqlQuery, [medicine_name], (err, result) => {
    if (err) {
    }
  });
});

app.post("/delete_patient", async function (req, res) {
  var patientName = req.body.patientName;
  
  var sqlQuery = `DELETE FROM patient WHERE patientId=?`;
  pool.query(sqlQuery, [patientName], (err, result) => {
    if (err) {
    }
  });
});


app.get("/", (req, res) => {
  res.status(200).send("Server Working!");
});

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
