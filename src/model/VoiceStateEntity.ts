import { Doc } from './Doc';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GuildEntity } from './GuildEntity';
import { MemberEntity } from './MemberEntity';
import { VoiceChannel, VoiceState } from 'discord.js';

@Entity()
export class VoiceStateEntity extends Doc {
  @ManyToOne(() => GuildEntity, (ge) => ge.voiceStates)
  guild!: GuildEntity;

  @OneToOne(() => MemberEntity, (me) => me.voiceState)
  @JoinColumn()
  member!: MemberEntity;

  static $create({ id, guild, member }: VoiceState): VoiceStateEntity {
    if (null == guild || null == member) {
      throw new Error('Guild or GuildMember can not be null');
    }

    return VoiceStateEntity.create({
      id,
      guild: { id: guild.id },
      member: { id: member.id },
    });
  }

  static async change(voiceState: VoiceState): Promise<void> {
    const { guild, member, channel } = voiceState;

    if (null == guild || null == member || !(channel instanceof VoiceChannel)) {
      return;
    }

    if (channel.members.has(member.id)) {
      await MemberEntity.$create(member, voiceState).save();

      console.log(member.displayName, 'connected to', channel.name, 'on', guild.name);
    } else {
      const voiceState = await VoiceStateEntity.findOne({
        where: {
          guild: guild.id,
          member: member.id,
        },
      });

      if (null == voiceState) {
        console.log(
          member.displayName,
          'is not registered on database as connected to',
          channel.name,
          'on',
          guild.name,
        );
      } else {
        await voiceState.remove();

        console.log(member.displayName, 'disconnected from', channel.name, 'on', guild.name);
      }
    }
  }
}
