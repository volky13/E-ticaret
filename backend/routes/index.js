const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const categoryRoute = require("./categories.js");
const paymentRoute = require("./payment.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/payment", paymentRoute);

module.exports = router;
