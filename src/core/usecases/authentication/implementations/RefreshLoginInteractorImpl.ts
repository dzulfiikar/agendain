import * as jose from 'jose';
import { UserGateway } from '../../../../adapters/gateways/UserGateway';
import { UserTokenGateway } from '../../../../adapters/gateways/UserTokenGateway';
import { RefreshLoginPresentationData } from '../../../../adapters/presenters/presenter-data/RefreshLoginPresentationData';
import { BadRequestError } from '../../../../frameworks/http/errors/BadRequestError';
import { RefreshLoginInteractor } from '../RefreshLoginInteractor';

export default class RefreshLoginInteractorImpl implements RefreshLoginInteractor {
  constructor(private readonly userTokenGateway: UserTokenGateway, private readonly userGateway: UserGateway) {}

  async execute(token: string): Promise<RefreshLoginPresentationData> {
    const userId = await this.userTokenGateway.getUserIdByToken(token);

    if (!userId) throw new BadRequestError(null, 'Invalid token');
    const accessToken = await new jose.SignJWT({ sub: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRATION!)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    const user = await this.userGateway.getUserById(userId);

    return {
      user: {
        name: user!.name,
        email: user!.email,
        created_at: user!.createdAt,
        updated_at: user!.updatedAt,
      },
      access_token: accessToken,
      refresh_token: token,
    };
  }
}
