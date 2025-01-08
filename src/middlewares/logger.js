"use strict"

//? LOGGER

const morgan = require("morgan")
// app.use(morgan("tiny"))
// app.use(morgan("short"))
// app.use(morgan("dev"))
// app.use(morgan("common"))
// app.use(morgan("combined"))

//! Kendimiz de format oluşturabiliriz
// app.use(morgan('TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'))

//! log kayıtlarını dosyaya yazma
// const fs = require("node:fs")
// app.use(morgan("combined", {
//   stream:fs.createWriteStream("./access.log", {flags:"a+"})
// }))

//! log kayıtlarının gün gün kaydetme
const fs= require("node:fs")
const now = new Date()
// console.log(now, typeof now) // 2025-01-08T09:14:23.558Z object
const today = now.toISOString().split("T")[0]
// console.log(today) // 2025-01-08
// app.use(morgan("combined", {
//   stream:fs.createWriteStream(`./logs/${today}.log`, {flags:"a+"})
// }))

module.exports = morgan("combined", {
    stream:fs.createWriteStream(`./logs/${today}.log`, {flags:"a+"})
  })