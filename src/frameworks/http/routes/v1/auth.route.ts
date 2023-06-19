import Elysia from 'elysia';
import { AuthenticationControllerImpl } from '../../../../adapters/controllers/implementations/AuthenticationControllerImpl';
import { UserGatewayImpl } from '../../../../adapters/gateways/implementations/UserGatewayImpl';
import { AuthenticationPresenterImpl } from '../../../../adapters/presenters/implementations/AuthenticationPresenterImpl';
import { RegisterInteractorImpl } from '../../../../core/usecases/authentication/implementations/RegisterInteractorImpl';
import prisma from '../../../database/prisma/PrismaClient';
import { UserRepositoryImpl } from '../../../database/repositories/implementations/UserRepositoryImpl';

const authenticationController = new AuthenticationControllerImpl(
  new RegisterInteractorImpl(new UserGatewayImpl(new UserRepositoryImpl(prisma))),
  new AuthenticationPresenterImpl()
);

const authRoute = (app: Elysia) => {
  app.post('/login', () => 'Hi');
  app.post('/register', ({ body, request }) => authenticationController.register(body));

  return app;
};

export default authRoute;
