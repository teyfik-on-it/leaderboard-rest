import environment from './environment';

if (null == environment.token) {
  throw new Error('Token is not defined');
}
