import environment from './environment';
import client from './client';
import { createConnection } from 'typeorm';
import { GuildEntity } from './model/GuildEntity';
import { VoiceStateEntity } from './model/VoiceStateEntity';
import { VoiceChannel } from 'discord.js';
import { MemberEntity } from './model/MemberEntity';

if (null == environment.token) {
  throw new Error('Token is not defined');
}

createConnection().then(() => {
  console.log('Initialized DB connection');

  client.on('ready', async () => {
    console.log('Client is ready now');

    await VoiceStateEntity.remove(await VoiceStateEntity.find());

    console.log('Flushed database');

    const voiceStates = client.guilds.cache
      .map((guild) =>
        guild.channels.cache
          .filter((channel) => channel instanceof VoiceChannel)
          .map((channel) => channel.members.map((member) => MemberEntity.$create(member))),
      )
      .flat(Infinity) as MemberEntity[];

    if (voiceStates.length > 0) {
      await MemberEntity.save(voiceStates);
    }

    console.log('Saved current state to database');

    client.on('guildCreate', async (guild) => {
      await GuildEntity.$create(guild).save();

      console.log('Created a new guild called', guild.name);
    });

    client.on('voiceStateUpdate', async (before, after) => {
      await VoiceStateEntity.change(before);
      await VoiceStateEntity.change(after);
    });

    console.log('Started to listening voice state updates');
  });
});
