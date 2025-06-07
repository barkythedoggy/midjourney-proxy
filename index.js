const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/prompt', (req, res) => {
  const prompt = req.body.prompt;
  console.log("Received prompt:", prompt);
  // 回傳確認
  res.status(200).send({ status: "Prompt received", prompt });
});

app.get('/', (req, res) => {
  res.send('MidJourney Proxy is alive!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
