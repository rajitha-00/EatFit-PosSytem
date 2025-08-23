// routes/payments.js
const express = require("express");
const router = express.Router();
const { handleCallback } = require("../controllers/paymentCtrl");

// Payment status callback endpoint
router.post("/callback", handleCallback);

module.exports = router;
