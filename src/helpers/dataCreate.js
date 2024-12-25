"use strict";
const departments = [
  {
    name: "Bilgi Teknolojileri",
    _id: "669531665d670713409e2a4a",
  },
  {
    name: "İnsan Kaynakları",
    _id: "66952d66e1b780e7b49e8111",
  },
  {
    name: "Finans",
    _id: "6695319c5d670713409e2a51",
  },
  {
    name: "Pazarlama",
    _id: "669531ad5d670713409e2a55",
  },
];
const personnels = [
  {
    departmentId: "66952d66e1b780e7b49e8111",
    username: "jdoe",
    password: "test1",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "jdoe@example.com",
    title: "Yazılım Mühendisi",
    salary: 75000,
    description: "BT departmanında junior geliştirici.",
    isActive: true,
    isAdmin: true,
    isLead: false,
  },
  {
    departmentId: "66952d66e1b780e7b49e8111",
    username: "asmith",
    password: "test1",
    firstName: "Alice",
    lastName: "Smith",
    phone: "0987654321",
    email: "asmith@example.com",
    title: "Proje Sorumlusu",
    salary: 90000,
    description: "Proje teslimatını denetler.",
    isActive: true,
    isAdmin: false,
    isLead: true,
  },
  {
    departmentId: "66952d66e1b780e7b49e8111",
    username: "bjackson",
    password: "test1",
    firstName: "Bob",
    lastName: "Jackson",
    phone: "2345678901",
    email: "bjackson@example.com",
    title: "UI/UX Tasarımcısı",
    salary: 70000,
    description: "Kullanıcı dostu arayüzler tasarlar.",
    isActive: true,
    isAdmin: false,
    isLead: true,
  },
  {
    departmentId: "66952d66e1b780e7b49e8111",
    username: "clara",
    password: "test1",
    firstName: "Clara",
    lastName: "Johnson",
    phone: "3456789012",
    email: "clara@example.com",
    title: "Veri Analisti",
    salary: 80000,
    description: "İş kararlarını bilgilendirmek için verileri analiz eder.",
    isActive: true,
    isAdmin: false,
    isLead: true,
  },
  {
    departmentId: "669531665d670713409e2a4a",
    username: "dsmith",
    password: "test1",
    firstName: "David",
    lastName: "Smith",
    phone: "4567890123",
    email: "dsmith@example.com",
    title: "DevOps Mühendisi",
    salary: 95000,
    description: "Sunucu altyapısını yönetir.",
    isActive: true,
    isAdmin: false,
    isLead: true,
  },
  {
    departmentId: "669531665d670713409e2a4a",
    username: "emily",
    password: "test1",
    firstName: "Emily",
    lastName: "Brown",
    phone: "5678901234",
    email: "emily@example.com",
    title: "QA Mühendisi",
    salary: 72000,
    description: "Yazılım ürünlerinin kalitesini sağlar.",
    isActive: true,
    isAdmin: false,
    isLead: false,
  },
  {
    departmentId: "669531ad5d670713409e2a55",
    username: "frank",
    password: "test1",
    firstName: "Frank",
    lastName: "Garcia",
    phone: "6789012345",
    email: "frank@example.com",
    title: "Teknik Destek",
    salary: 60000,
    description: "Müşterilere teknik destek sağlar.",
    isActive: true,
    isAdmin: false,
    isLead: true,
  },
  {
    departmentId: "669531ad5d670713409e2a55",
    username: "george",
    password: "test1",
    firstName: "George",
    lastName: "Martinez",
    phone: "7890123456",
    email: "george@example.com",
    title: "Sistem Yöneticisi",
    salary: 88000,
    description: "BT sistemlerini ve ağlarını yönetir.",
    isActive: true,
    isAdmin: false,
    isLead: false,
  },
  {
    departmentId: "669531ad5d670713409e2a55",
    username: "hannah",
    password: "test1",
    firstName: "Hannah",
    lastName: "Wilson",
    phone: "8901234567",
    email: "hannah@example.com",
    title: "Ürün Sahibi",
    salary: 85000,
    description: "Ürün vizyonunu ve yol haritasını tanımlar.",
    isActive: true,
    isAdmin: true,
    isLead: false,
  },
];
const Personnel = require("../models/personnel.model");
const Department = require("../models/department.model");
const { mongoose } = require("../configs/dbConnection");

async function dataCreate() {
  //!   await mongoose.connection.dropDatabase(); arayüzden yetki gerekli
  await Department.deleteMany();
  await Department.insertMany(departments);
  await Personnel.deleteMany();
  await Personnel.create({
    departmentId: "66952d66e1b780e7b49e8111",
    username: "admin",
    password: "test1",
    firstName: "Admin",
    lastName: "Doe",
    phone: "1234567890",
    email: "admin@example.com",
    title: "Yazılım Mühendisi",
    salary: 75000,
    description: "BT departmanında junior geliştirici.",
    isActive: true,
    isAdmin: true,
    isLead: false,
  });

  let updatedPersonnels = [];

  updatedPersonnels = personnels.map((personnel) => ({
    ...personnel,
    isAdmin: false,
  }));

  await Personnel.insertMany(updatedPersonnels);
}
module.exports = dataCreate;
