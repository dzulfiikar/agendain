export interface UserTokenGateway {
  createToken(userId: string): Promise<string>;
  getUserIdByToken(token: string): Promise<string | null>;
}
