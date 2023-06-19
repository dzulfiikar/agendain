import Elysia from 'elysia';
import logger from '../logging/WinstonLogger';
import v1Route from './routes/v1';

export default class Server {
  private elysia: Elysia;

  constructor() {
    this.elysia = new Elysia();
  }

  init() {
    this.routes();
    this.start();
  }

  private start() {
    this.elysia.listen(
      {
        port: process.env.APP_PORT || 3000,
        hostname: process.env.APP_HOST || '127.0.0.1',
        development: process.env.NODE_ENV !== 'production',
      },
      () => {
        logger.info(
          `Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT} on ${process.env.NODE_ENV} mode `
        );
      }
    );
  }

  private routes() {
    this.elysia.group('/api/v1', (app) => v1Route(app));
    this.elysia.group('/healthz', (app) => app.get('', () => 'OK'));
  }
}
