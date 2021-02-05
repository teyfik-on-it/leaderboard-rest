import { Doc } from './Doc';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { VoiceStateEntity } from './VoiceStateEntity';
import { GuildEntity } from './GuildEntity';
import { UserEntity } from './UserEntity';
import { GuildMember } from 'discord.js';

@Entity()
export class MemberEntity
  extends Doc
  implements Pick<GuildMember, 'displayName' | 'displayHexColor'> {
  @Column()
  displayName!: string;

  @Column()
  displayHexColor!: string;

  @ManyToOne(() => UserEntity, (ue) => ue.members, { cascade: true })
  user!: UserEntity;

  @OneToOne(() => GuildEntity, (ge) => ge.members)
  guild!: GuildEntity;

  @OneToOne(() => VoiceStateEntity, (vse) => vse.member, { cascade: true })
  voiceStates!: VoiceStateEntity[];
}
