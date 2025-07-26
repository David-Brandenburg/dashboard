// backend/models/Device.js
const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    deviceId: {
      // eindeutige Kennung, z.B. "device-001"
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      // lesbarer Name, z.B. "Pi in Küche"
      type: String,
      default: "",
    },
    ipAddress: {
      // zur Fernverwaltung
      type: String,
      default: "",
    },
    lastSeen: {
      // Timestamp der letzten Kommunikation
      type: Date,
      default: Date.now,
    },
    status: {
      // z.B. "online" | "offline"
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", DeviceSchema);
