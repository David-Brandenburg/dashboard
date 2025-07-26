// backend/models/Dashboard.js
const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema(
  {
    // Eindeutige Geräte‑ID (z.B. "device-001")
    deviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Layout‑Konfiguration (frei strukturiert, z.B. Positionen/Widgets)
    layout: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Wetter‑Einstellungen
    weatherConfig: {
      city: {
        type: String,
        required: true,
        default: "Unknown",
      },
      units: {
        type: String,
        enum: ["metric", "imperial"],
        default: "metric",
      },
    },

    // Liste von News‑Feed URLs
    newsFeed: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt automatisch anlegen
    versionKey: false, // __v weglassen, wenn nicht benötigt
  }
);

module.exports = mongoose.model("Dashboard", DashboardSchema);
