const jwtToUserId = async (request: any, jwt: any): Promise<string> => {
  return await jwt.verify(request.headers.get('authorization')?.split(' ')[1]).sub;
};

export { jwtToUserId };
