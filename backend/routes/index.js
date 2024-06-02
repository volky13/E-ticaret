const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const categoryRoute = require("./categories.js");
const paymentRoute = require("./payment.js");
const authRoute = require("./auth.js");
const couponRoute = require("./coupons.js");
const userRoute = require("./users.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/payment", paymentRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);

module.exports = router;
