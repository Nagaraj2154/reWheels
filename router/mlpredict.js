// router/mlpredict.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/predict-price', async (req, res) => {
  try {
    const flaskResponse = await axios.post(
      'http://localhost:5000/predict',
      req.body, // forward JSON body
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(flaskResponse.data);
  } catch (err) {
    console.error("❌ Prediction error:", err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
