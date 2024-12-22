"use strict"
 
// MongoDB Bağlanma:

const mongoose = require('mongoose')

const dbConnection = function() {
    // Bağlanma:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* Veri tabanına bağlandı * '))
        .catch((err) => console.log('* Veri tabanına bağlanamadı* ', err))
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 