import environment from './environment';
import client from './client';
import { createConnection } from 'typeorm';
import { GuildEntity } from './model/GuildEntity';
import { VoiceStateEntity } from './model/VoiceStateEntity';

if (null == environment.token) {
  throw new Error('Token is not defined');
}

createConnection().then(() => {
  console.log('Initialized DB connection');

  client.on('ready', () => {
    console.log('Client is ready now');

    client.on('guildCreate', async (guild) => {
      await GuildEntity.$create(guild).save();

      console.log('Created a new guild called', guild.name);
    });

    client.on('voiceStateUpdate', async (before, after) => {
      await VoiceStateEntity.change(before);
      await VoiceStateEntity.change(after);
    });
  });
});
