import { Doc } from './Doc';
import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { GuildEntity } from './GuildEntity';
import { MemberEntity } from './MemberEntity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class VoiceStateEntity extends Doc {
  @ManyToOne(() => GuildEntity, (ge) => ge.voiceStates)
  guild!: GuildEntity;

  @OneToOne(() => MemberEntity, (me) => me.voiceStates)
  @JoinColumn()
  member!: MemberEntity;
}
