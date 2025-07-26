// backend/controllers/weatherController.js
const axios = require("axios");

const API_KEY = process.env.WEATHER_API_KEY;

// 1. Geocoding: City → { lat, lon }
async function geocode(city) {
  const geoRes = await axios.get(
    "http://api.openweathermap.org/geo/1.0/direct",
    {
      params: { q: city, limit: 1, appid: API_KEY },
    }
  );
  if (!geoRes.data.length) throw new Error("City not found");
  const { lat, lon } = geoRes.data[0];
  return { lat, lon };
}

// 2. Aktuelles Wetter (wie bisher)
async function fetchCurrent(lat, lon, units) {
  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: { lat, lon, units, appid: API_KEY },
    }
  );
  const data = res.data;
  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

// 3. Historisches Wetter (Time Machine)
async function fetchHistorical(lat, lon, dt) {
  const res = await axios.get(
    "https://api.openweathermap.org/data/3.0/onecall/timemachine",
    {
      params: { lat, lon, dt, appid: API_KEY },
    }
  );
  // Beispiel: wir nehmen die mittlere Temp zur angegebenen Stunde
  const entry = res.data.data.find((e) => e.dt === dt) || res.data.data[0];
  return {
    temp: Math.round(entry.temp),
    description: entry.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
  };
}

exports.getWeather = async (req, res) => {
  const { city, units = "metric", dt } = req.query;
  try {
    if (!city) {
      return res.status(400).json({ message: "Missing city parameter" });
    }
    const { lat, lon } = await geocode(city);

    let weather;
    if (dt) {
      const timestamp = parseInt(dt, 10);
      if (isNaN(timestamp)) {
        return res.status(400).json({ message: "Invalid dt parameter" });
      }
      weather = await fetchHistorical(lat, lon, timestamp);
    } else {
      weather = await fetchCurrent(lat, lon, units);
    }

    res.json(weather);
  } catch (err) {
    console.error("Weather error:", err.message);
    const status = err.message === "City not found" ? 404 : 502;
    res.status(status).json({ message: err.message });
  }
};
