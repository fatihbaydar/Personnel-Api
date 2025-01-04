"use strict";

/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

// .env dosyasındaki değişkenler
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asenkron hata yakalayıcı.
require("express-async-errors");
/* ------------------------------------------------------- */

// veri tabanına bağlanma:
dbConnection();

// body parser: body'den gelen veriyi js objesine dönüştürmek için
app.use(express.json());

// cookie: httpOnly:true XSS Cross Site Scripting, secure:https
const session = require("cookie-session")
app.use(session({
    secret:process.env.SECRET_KEY, // Cookie verisini şifreleme anahtarı
}))

// res.getModelList
app.use(require("./src/middlewares/findSearchSortPage"));

// Ana Yol
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: " PERSONEL API'YE HOŞ GELDİNİZ",
    session: req.session,
    isLogin: req.isLogin,
  });
});

// departmanlar
app.use("/department", require("./src/routes/department.router"))

// personeller
app.use("/personnel", require("./src/routes/personnel.router"))

// bulunamadı yolu: hatalı URL yazılırsa tespiti daha kolay olur
app.all(".", (req, res) => {
  res.status(404).send({
    error: true,
    message: "Yol bulunamadı",
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// Serverı çalıştır:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (yorum satırında kalmalı):
// require('./src/helpers/sync')()

if (process.env.NODE_ENV == "development") {
  return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("veri eşleşmesi yapıldı"))
    .catch((err) => console.log("veri eşleşmesi yapılamadı"));
}
