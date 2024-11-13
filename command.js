// command.js
export async function createProject(interaction) {
  const projectName = interaction.options.getString('name');
  
  // Logic to create a project goes here
  await interaction.reply(`Project "${projectName}" created!`);
}

export async function ping(interaction) {
  await interaction.reply('Ppppppp!');
}