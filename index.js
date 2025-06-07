const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const PORT = process.env.PORT || 3000;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

app.use(express.json());

app.post('/prompt', async (req, res) => {
  const prompt = req.body.prompt;
  console.log("Received prompt:", prompt);

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      return res.status(404).send({ error: 'Channel not found' });
    }

    // ✅ 傳送給 MidJourney Bot 的指令
    await channel.send(`/imagine ${prompt}`);
    res.send({ success: true, sent: prompt });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send({ error: "Failed to send message", detail: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('MidJourney Proxy is alive!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
