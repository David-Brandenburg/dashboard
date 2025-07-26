const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

// Dieser Endpoint wird vom Browser mit NTLM‑Handshake aufgerufen
router.get("/windows", authCtrl.windowsLogin);

module.exports = router;
