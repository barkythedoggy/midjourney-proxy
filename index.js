const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
app.use(express.json());

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.post('/prompt', async (req, res) => {
  const prompt = req.body.prompt;
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel) return res.status(404).send({ error: 'Channel not found' });

  await channel.send(`/imagine ${prompt}`);
  res.send({ success: true });
});

client.login(DISCORD_TOKEN);
app.listen(3000, () => console.log('Server listening on port 3000'));
