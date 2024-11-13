import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

export { TOKEN, CLIENT_ID, GUILD_ID };
