import { Client } from 'discord.js';
import environment from './environment';

const client = new Client();

client.login(environment.token).catch((error) => {
  console.error('Could not authorize');
  console.error(error);
});

export default client;
