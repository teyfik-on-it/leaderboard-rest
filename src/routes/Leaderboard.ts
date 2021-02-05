import { Response, Router } from 'express';
import { GuildEntity } from '../model/GuildEntity';
import { plainToClass } from 'class-transformer';
import { GuildWithCount } from './Leaderboard/GuildWithCount';

const Leaderboard = Router();

Leaderboard.get('/', async (_, res: Response) => {
  GuildEntity.createQueryBuilder('g')
    .leftJoin('g.voiceStates', 'vs', 'g.id = vs.guildId')
    .addSelect('COUNT(g.id) as voiceCount')
    .groupBy('g.id')
    .addGroupBy('vs.id')
    .orderBy('voiceCount', 'DESC')
    .execute()
    .then((result) =>
      plainToClass(GuildWithCount, result, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
    )
    .then((result) => res.send(result));
});

export default Leaderboard;
