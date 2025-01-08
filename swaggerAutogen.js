"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autogen
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express
/* ------------------------------------------------------- */

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- *


const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};

/* ------------------------------------------------------- */

// const swaggerAutogen = require("swagger-autogen")({openapi:"3.0.0", language:tr-TR})
const swaggerAutogen = require("swagger-autogen")()

const document = {
    info: {
        version:"1.1.0",
        title:"PersonnelAPI",
        description:"Personnel Management System",
        termOfService:"http://127.0.0.1:",
        contact:{name:"Baydar", email: "baydar@baydar.com"},
        license:{name:"Yorkup License"}
    }
}