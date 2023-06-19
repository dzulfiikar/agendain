import { Elysia } from 'elysia';
import authRoute from './auth.route';

const v1Route = (app: Elysia) => {
  app.group('/auth', (app) => authRoute(app));
  return app;
};

export default v1Route;
