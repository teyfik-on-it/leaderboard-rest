import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Guild } from 'discord.js';
import { VoiceStateEntity } from './VoiceStateEntity';
import { MemberEntity } from './MemberEntity';
import { Doc } from './Doc';

@Entity()
export class GuildEntity extends Doc implements Pick<Guild, 'name' | 'icon'> {
  @Column()
  name!: string;

  @Column()
  icon!: string | null;

  @ManyToMany(() => MemberEntity, (me) => me.guilds)
  members!: MemberEntity[];

  @OneToMany(() => VoiceStateEntity, (vs) => vs.guild)
  voiceStates!: VoiceStateEntity[];
}
