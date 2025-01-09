"use strict"

const {isAdmin} = require("../middlewares/permission")
const router = require("express").Router()
// const {list,read, create,update,delete:deleteToken} = require("../controllers/token.controller") //  bu şekilde iken swagger.ignore=true yapmamıza rağmen swaggerda delete'i göstermeye devam etiği için yoruma alındı.
const token = require("../controllers/token.controller")

router.use(isAdmin)

router.route("/")
.get(token.list)
.post(token.create)

router.route("/:id")
.get(token.read)
.post(token.update)
.patch(token.update)
.delete(token.delete)

module.exports = router
