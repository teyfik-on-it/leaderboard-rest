import { Expose } from 'class-transformer';

export class GuildWithCount {
  @Expose({ name: 'g_id' })
  id!: string;

  @Expose({ name: 'g_icon' })
  icon!: string;

  @Expose({ name: 'g_name' })
  name!: string;

  @Expose({ name: 'g_createdAt' })
  createdAt!: Date;

  @Expose({ name: 'g_updatedAt' })
  updatedAt!: Date;

  @Expose({ name: 'g_deletedAt' })
  deletedAt?: Date;

  @Expose({ name: 'voicecount' })
  voicecount!: number;
}
