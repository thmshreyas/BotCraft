import { TOKEN, CLIENT_ID, GUILD_ID } from './config.js';
import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'help', // Corrected from 'hhelp' to 'help'
    description: 'Provides help information.'
  },
  {
    name: 'create-challenge',
    description: 'Creates a new coding challenge',
    options: [
        {
            type: 3, // STRING type
            name: 'name',
            description: 'Name of the challenge',
            required: true,
        },
        {
            type: 3, // STRING type
            name: 'description',
            description: 'Description of the challenge',
            required: true,
        },
        {
            type: 3, // STRING type
            name: 'link',
            description: 'Link to resources or submissions',
            required: true,
        },
        {
            type: 3, // STRING type
            name: 'time',
            description: 'Time for the challenge (e.g., "2024-11-20T12:00")',
            required: true,
        },
    ],
  }
];

// Create an async function to register commands
async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    // Use the correct route for registering commands
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

// Call the function to register commands
registerCommands();