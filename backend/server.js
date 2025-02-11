const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Import the API functions
const { getSummery } = require('../api/api');

// Create endpoint for summary generation
app.post('/api/summary', async (req, res) => {
  try {
    const { url, chapterType, sumLang } = req.body;
    const summary = await getSummery(url, chapterType, sumLang);
    res.json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});