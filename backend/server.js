import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "12mb" }));

app.post("/api/analyze-plant", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64" });
    }

    const resp = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.PLANT_ID_KEY,
      },
      body: JSON.stringify({
        images: [imageBase64],
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return res.status(resp.status).json({
        error: data?.message || "Plant.id request failed",
        details: data,
      });
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error", details: String(e) });
  }
});

app.listen(5000, () => console.log("Backend running: http://localhost:5000"));