import { UnauthorizedError } from '../errors/UnauthorizedError';

const authenticationHandler = async ({ request, jwt }) => {
  const jwtToken = await jwt.verify(request.headers.get('authorization')?.split(' ')[1]);
  if (!jwtToken) {
    throw new UnauthorizedError();
  }

  return (request.userId = jwt.sub);
};

export { authenticationHandler };
