// backend/controllers/deviceController.js
const Device = require("../models/Device");

/**
 * GET /api/devices
 * Listet alle registrierten Devices.
 */
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().sort("deviceId");
    res.json(devices);
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/devices/:deviceId
 * Gibt ein einzelnes Device anhand der deviceId zurück.
 */
exports.getDeviceById = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(device);
  } catch (err) {
    console.error(`Error fetching device ${deviceId}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/devices
 * Legt ein neues Device an.
 * Erwartet im Body JSON mit { deviceId, name?, ipAddress? }.
 */
exports.createDevice = async (req, res) => {
  const { deviceId, name, ipAddress } = req.body;
  try {
    const exists = await Device.findOne({ deviceId });
    if (exists) {
      return res.status(400).json({ message: "DeviceId already exists" });
    }
    const device = new Device({ deviceId, name, ipAddress });
    await device.save();
    res.status(201).json(device);
  } catch (err) {
    console.error("Error creating device:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/devices/:deviceId
 * Aktualisiert Metadaten eines Devices.
 * Erwartet im Body JSON mit { name?, ipAddress?, status? }.
 */
exports.updateDevice = async (req, res) => {
  const { deviceId } = req.params;
  const updates = (({ name, ipAddress, status }) => ({
    name,
    ipAddress,
    status,
  }))(req.body);
  try {
    const device = await Device.findOneAndUpdate(
      { deviceId },
      { ...updates, lastSeen: Date.now() },
      { new: true, runValidators: true }
    );
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(device);
  } catch (err) {
    console.error(`Error updating device ${deviceId}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/devices/:deviceId
 * Entfernt ein Device aus der Datenbank.
 */
exports.deleteDevice = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const result = await Device.deleteOne({ deviceId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(204).end();
  } catch (err) {
    console.error(`Error deleting device ${deviceId}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};
