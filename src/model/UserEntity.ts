import { Doc } from './Doc';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from 'discord.js';
import { MemberEntity } from './MemberEntity';

@Entity()
export class UserEntity
  extends Doc
  implements
    Pick<User, 'username' | 'discriminator' | 'avatar' | 'defaultAvatarURL'> {
  @Column()
  avatar!: string;

  @Column({ nullable: true })
  username!: string;

  @Column()
  discriminator!: string;

  @Column()
  defaultAvatarURL!: string;

  @OneToMany(() => MemberEntity, (me) => me.user)
  members!: MemberEntity[];
}
