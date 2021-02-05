import yenv from 'yenv';

interface Environment {
  token: string;
  port: number;
  host: string;
}

const environment = yenv<Environment>('env.yaml', {
  env: process.env.NODE_ENV ?? 'dev',
});

export default environment;
