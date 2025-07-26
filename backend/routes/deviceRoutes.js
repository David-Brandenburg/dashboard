// backend/routes/deviceRoutes.js
const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

// Alle Devices abrufen
router.get("/", deviceController.getAllDevices);

// Ein einzelnes Device abrufen
router.get("/:deviceId", deviceController.getDeviceById);

// Neues Device anlegen
router.post("/", deviceController.createDevice);

// Device-Daten aktualisieren
router.put("/:deviceId", deviceController.updateDevice);

// Device löschen
router.delete("/:deviceId", deviceController.deleteDevice);

module.exports = router;
