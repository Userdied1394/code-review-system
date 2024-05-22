const express = require('express');
const fileUpload = require('express-fileupload');
const { analyzeCode } = require('./analyzer');
const pool = require('./db_config');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.file;
  const analysisResult = await analyzeCode(file.data.toString());

  const client = await pool.connect();
  try {
    await client.query('INSERT INTO submissions (code, analysis_result) VALUES ($1, $2)', [file.data.toString(), analysisResult]);
  } finally {
    client.release();
  }

  res.send(analysisResult);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
