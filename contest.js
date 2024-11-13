let challenges = []; // Array to store challenges

client.once('ready', () => {
    console.log('Bot is online!');
});

// Registering slash commands
const commands = [
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
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Handling interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

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