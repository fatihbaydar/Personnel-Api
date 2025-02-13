"use strict"
 
// SYCHRONIZATION:

module.exports = async function() {

    return null;

    /* Veri Tabanı Silindi */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Veri tabanı ve tüme veriler silindi!')
    /* Veri Tabanı Silindi */
    
    /* Department & Personnel */
    const Department = require('../models/department.model')
    const Personnel = require('../models/personnel.model')
    const departments = [
        "FullStack Department",
        "DevOps Department",
        "CyberSec Department",
    ]
    departments.forEach(value => {
        // Department.create:
        Department.create({ name: value }).then((department) => {
            console.log('- Departman eklendi.')
            // Personnel.create:
            for (let i in [...Array(10)]) {
                Personnel.create({
                    departmentId: department._id,
                    username: "test" + (value[0] + i),
                    password: "1234",
                    firstName: "firstName",
                    lastName: "lastName",
                    phone: "123456789",
                    email: "test" + (value[0] + i) + "@site.com",
                    title: "title",
                    salary: 2500,
                    description: "description",
                    isActive: true,
                    isAdmin: false,
                    isLead: false,
                    startedAt: "2023-10-15 13:14:15"
                })
            }
            console.log('- Personel Eklendi.')
        })
    })
    /* Department & Personnel */
}