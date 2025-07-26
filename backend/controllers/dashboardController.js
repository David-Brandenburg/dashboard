// backend/controllers/dashboardController.js
const Dashboard = require("../models/Dashboard");

/**
 * GET /api/dashboard/:deviceId
 * Liefert die Konfiguration für ein bestimmtes Gerät.
 */
exports.getDashboardConfig = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const config = await Dashboard.findOne({ deviceId });
    if (!config) {
      return res.status(404).json({ message: "Dashboard config not found" });
    }
    res.json(config);
  } catch (err) {
    console.error("Error fetching dashboard config:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/dashboard/:deviceId
 * Setzt oder aktualisiert die Konfiguration für ein Gerät.
 * Erwartet im Body JSON mit { layout, weatherConfig, newsFeed }
 */
exports.setDashboardConfig = async (req, res) => {
  const { deviceId } = req.params;
  const { layout, weatherConfig, newsFeed } = req.body;

  try {
    const updated = await Dashboard.findOneAndUpdate(
      { deviceId },
      { layout, weatherConfig, newsFeed },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error saving dashboard config:", err);
    res.status(500).json({ message: "Server error" });
  }
};
