"use strict";

const passwordEncrypt = require("../helpers/passwordEncrypt");
const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, "departmentId");
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
    //* admin'i doğrudan false'a çek:
    req.body.isAdmin = false;

    //* isLead Kontrolü. 1 tane isLead varsa 2.sine engel olur.
    const isLead = req.body.isLead || false;

    if (isLead) {
      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }

    const data = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }

    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user) {
        if (user.password !== passwordEncrypt(password)) {
          res.errorStatusCode = 401;
          throw new Error("Giriş gereklilikleri yanlış");
        }

        req.session = {
          id: user._id,
          password: user.password,
        };

        if (req.body?.rememberMe) {
          req.session.rememberMe = true;
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }

        res.status(200).send({
          error: false,
          message: "Giriş işlemi başarılı",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Yanlış kullanıcı bilgisi");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Lütfen geçerli bir email ve parola girin");
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.send({
      error: false,
      message: "Çıkış işlemi gerçekleştirildi",
    });
  },
};
