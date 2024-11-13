import { TOKEN, CLIENT_ID, GUILD_ID } from './config.js';
import { hello } from './pong.js';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const challenges = []; // Declare the challenges array

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return; // Check if it's a command interaction

  const { commandName } = interaction; // Get command name

  if (commandName === 'ping') {
    return interaction.reply({ content: hello(), ephemeral: true });
  }

  if (commandName === 'help') { // Corrected from 'hhelp' to 'help'
    return interaction.reply({ content: "Help is working", ephemeral: true });
  }

  if (commandName === 'create-challenge') {
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');
    const link = interaction.options.getString('link');
    const time = interaction.options.getString('time');

    // Create a new challenge object
    const newChallenge = { name, description, link, time };
    challenges.push(newChallenge);

    await interaction.reply(`Challenge created!\n**Name:** ${name}\n**Description:** ${description}\n**Link:** ${link}\n**Time:** ${time}`);
  }
});

client.login(TOKEN);