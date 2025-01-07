"use strict";

const router = require("express").Router();
const department = require("../controllers/department.controller");
const permission = require("../middlewares/permission")

router.route("/").get(department.list).post(permission.isAdmin, department.create);

router
    .route("/:id")
    .get(permission.isLogin,department.read)
    .put(permission.isAdmin,department.update)
    .patch(permission.isAdmin,department.update)
    .delete(permission.isAdmin,department.delete);

router.get("/:id/personnel", department.personnels)
module.exports = router;
