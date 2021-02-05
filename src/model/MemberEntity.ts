import { Doc } from './Doc';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { VoiceStateEntity } from './VoiceStateEntity';
import { GuildEntity } from './GuildEntity';
import { UserEntity } from './UserEntity';
import { GuildMember, VoiceState } from 'discord.js';

@Entity()
export class MemberEntity extends Doc implements Pick<GuildMember, 'displayName' | 'displayHexColor'> {
  @Column()
  displayName!: string;

  @Column()
  displayHexColor!: string;

  @ManyToOne(() => UserEntity, (ue) => ue.members, { cascade: true })
  user!: UserEntity;

  @OneToOne(() => VoiceStateEntity, (vse) => vse.member, { cascade: true })
  voiceState!: VoiceStateEntity;

  @ManyToOne(() => GuildEntity, (ge) => ge.members)
  guild!: GuildEntity;

  static $create({ id, displayName, displayHexColor, guild, user }: GuildMember, voiceState: VoiceState): MemberEntity {
    return MemberEntity.create({
      id,
      displayName,
      displayHexColor,
      guild: GuildEntity.$create(guild),
      user: UserEntity.$create(user),
      voiceState: VoiceStateEntity.$create(voiceState),
    });
  }
}
