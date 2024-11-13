import { Client, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { TOKEN, CLIENT_ID, GUILD_ID } from './config.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Command to create a text channel
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'create') {
        const projectName = options.getString('projectname');
        
        // Log project name for debugging
        console.log(`Creating text channel for project: ${projectName}`);

        // Check if projectName is valid
        if (!projectName) {
            await interaction.reply('Error: Project name cannot be empty.');
            return;
        }

        try {
            // Create a text channel
            const textChannel = await interaction.guild.channels.create({
                name: projectName,
                type: 0, // GUILD_TEXT
                topic: `Text channel for project: ${projectName}`,
                nsfw: false, // Set to true if you want it to be NSFW
                permissionOverwrites: [], // Add any permission overwrites if necessary
            });

            await interaction.reply(`Created text channel: ${textChannel.name}`);
        } catch (error) {
            console.error('Error creating text channel:', error);
            await interaction.reply('There was an error creating the text channel.');
        }
    } else if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

// Register commands with Discord API (only needs to be done once)
const commands = [
    {
        name: 'create',
        description: 'Creates a text channel',
        options: [
            {
                name: 'projectname',
                type: 3, // STRING type
                description: 'The name of the project',
                required: true,
            },
        ],
    },
    {
        name: 'ping',
        description: 'Responds with pong',
    },
];

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(TOKEN);