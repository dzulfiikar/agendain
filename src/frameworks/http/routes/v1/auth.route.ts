import jwt from '@elysiajs/jwt';
import Elysia from 'elysia';
import { AuthenticationControllerImpl } from '../../../../adapters/controllers/implementations/AuthenticationControllerImpl';
import { UserGatewayImpl } from '../../../../adapters/gateways/implementations/UserGatewayImpl';
import UserTokenGatewayImpl from '../../../../adapters/gateways/implementations/UserTokenGatewayImpl';
import { AuthenticationPresenterImpl } from '../../../../adapters/presenters/implementations/AuthenticationPresenterImpl';
import LoginInteractorImpl from '../../../../core/usecases/authentication/implementations/LoginInteractorImpl';
import ProfileInteractorImpl from '../../../../core/usecases/authentication/implementations/ProfileInteractorImpl';
import RefreshLoginInteractorImpl from '../../../../core/usecases/authentication/implementations/RefreshLoginInteractorImpl';
import { RegisterInteractorImpl } from '../../../../core/usecases/authentication/implementations/RegisterInteractorImpl';
import { jwtToUserId } from '../../../../utils/jwt.util';
import mongoPrisma from '../../../database/prisma/MongoPrismaClient';
import prisma from '../../../database/prisma/PrismaClient';
import { UserRepositoryImpl } from '../../../database/repositories/implementations/UserRepositoryImpl';
import UserTokenRepositoryImpl from '../../../database/repositories/implementations/UserTokenRepositoryImpl';
import { authenticationHandler } from '../../handlers/user-authenticated.handler';

const authenticationController = new AuthenticationControllerImpl(
  new RegisterInteractorImpl(new UserGatewayImpl(new UserRepositoryImpl(prisma))),
  new LoginInteractorImpl(
    new UserGatewayImpl(new UserRepositoryImpl(prisma)),
    new UserTokenGatewayImpl(new UserTokenRepositoryImpl(mongoPrisma))
  ),
  new ProfileInteractorImpl(new UserGatewayImpl(new UserRepositoryImpl(prisma))),
  new RefreshLoginInteractorImpl(
    new UserTokenGatewayImpl(new UserTokenRepositoryImpl(mongoPrisma)),
    new UserGatewayImpl(new UserRepositoryImpl(prisma))
  ),
  new AuthenticationPresenterImpl()
);

const authRoute = (app: Elysia) => {
  app.post('/login', ({ body }) => authenticationController.login(body));
  app.post('/register', ({ body, request }) => authenticationController.register(body));
  app.post('/refresh-login', ({ body }) => authenticationController.refreshLogin(body));
  app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
      })
    )
    .on('beforeHandle', authenticationHandler)
    .get('/profile', async ({ jwt, headers, request }) => {
      const userId = await jwtToUserId(request, jwt);
      return await authenticationController.profile(userId);
    });

  return app;
};

export default authRoute;
