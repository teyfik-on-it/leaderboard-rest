import { Column, Entity, OneToMany } from 'typeorm';
import { Guild } from 'discord.js';
import { VoiceStateEntity } from './VoiceStateEntity';
import { MemberEntity } from './MemberEntity';
import { Doc } from './Doc';

@Entity()
export class GuildEntity extends Doc implements Pick<Guild, 'name' | 'icon'> {
  @Column()
  name!: string;

  @Column()
  icon!: string;

  @OneToMany(() => MemberEntity, (me) => me.guild)
  members!: MemberEntity[];

  @OneToMany(() => VoiceStateEntity, (vs) => vs.guild)
  voiceStates!: VoiceStateEntity[];

  static $create({ id, name, icon }: Guild): GuildEntity {
    return GuildEntity.create({
      id,
      name,
      icon: icon ?? 'https://discord.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png',
    });
  }
}
