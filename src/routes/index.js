"use strict"

const router = require("express").Router()

// auth
router.use("/auth",require("./auth.router"))

// department
router.use("/department",require("./department.router"))

// personnel
router.use("/personnel",require("./personnel.router"))

// token
router.use("/token",require("./token.router"))

module.exports= router