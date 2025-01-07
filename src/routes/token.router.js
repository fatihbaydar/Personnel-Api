"use strict"

const {isAdmin} = require("../middlewares/permission")
const router = require("express").Router()
const {list,read, create,update,delete:deleteToken} = require("../controllers/token.controller")

router.use(isAdmin)

router.route("/")
.get(list)
.post(create)

router.route("/:id")
.get(read)
.post(update)
.patch(update)
.delete(deleteToken)

module.exports = router
