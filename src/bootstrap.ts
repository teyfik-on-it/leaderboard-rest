import express from 'express';
import Leaderboard from './routes/Leaderboard';
import environment from './environment';

const bootstrap = (): Promise<void> => {
  return new Promise((resolve) => {
    const app = express();

    app.use('/leaderboard', Leaderboard);
    app.listen(environment.port, environment.host, resolve);
  });
};

export default bootstrap;
