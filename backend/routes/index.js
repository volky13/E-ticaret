const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const categoryRoute = require("./categories.js");
const paymentRoute = require("./payment.js");
const authRoute = require("./auth.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/payment", paymentRoute);
router.use("/auth", authRoute);

module.exports = router;
