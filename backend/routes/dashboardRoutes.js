// backend/routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Konfiguration eines Geräts abrufen
router.get("/:deviceId", dashboardController.getDashboardConfig);

// Konfiguration eines Geräts anlegen oder aktualisieren
router.post("/:deviceId", dashboardController.setDashboardConfig);

module.exports = router;
