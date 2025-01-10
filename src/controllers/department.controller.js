"use strict";

const Department = require("../models/department.model");
const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Listele'
        #swagger.description = `
            Şu metodları kullanarak istek gönderebilirsiniz: filter[], search[], sort[], page ve limit.
            <ul> Örnekler:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
    //! veri
    const data = await res.getModelList(Department);

    res.status(200).send({
      error: false,
      //! detay
      detail: await res.getModelListDetails(Department),
      data,
    });
  },

  create: async (req, res) => {
           /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Oluşturma'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
               $ref:"#/definitions/Department"
            }
        }
       */
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
       /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Okuma'
       */
    const data = await Department.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
      /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Güncelle'
        #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            $ref:"#/definitions/Department"
        }
       */
    //! Varsayılan ayarlarda onay işlemi yapmaz o yüzden runValidators kullanıldı
    const data = await Department.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Department.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
        /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Silme'
       */
    const data = await Department.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  personnels: async (req, res) => {
        /*
        #swagger.tags = ['Departmanlar']
        #swagger.summary = 'Listele'
       */
    const filter = {departmentId:req.params.id}
    const data = await res.getModelList(Personnel, filter, "departmentId");
    res.status(200).send({
      error:false,
      detail: await res.getModelListDetails(Personnel, filter),
      data
    })
  },
};
