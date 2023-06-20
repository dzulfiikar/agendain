export interface UserTokenRepository {
  createToken(userId: string, token: string): Promise<string>;
  getUserIdByToken(token: string): Promise<string | null>;
}
