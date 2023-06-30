import * as jose from 'jose';
import { LoginDTO } from '../../../../adapters/controllers/dtos/LoginDTO';
import { UserGateway } from '../../../../adapters/gateways/UserGateway';
import { UserTokenGateway } from '../../../../adapters/gateways/UserTokenGateway';
import { LoginPresentationData } from '../../../../adapters/presenters/presenter-data/LoginPresentationData';
import { BadRequestError } from '../../../../frameworks/http/errors/BadRequestError';
import { LoginInteractor } from '../LoginInteractor';

export default class LoginInteractorImpl implements LoginInteractor {
  constructor(private readonly userGateway: UserGateway, private readonly userTokenGateway: UserTokenGateway) {}

  async execute(body: LoginDTO): Promise<LoginPresentationData> {
    // check if user exists
    const user = await this.userGateway.getUserByEmail(body.email);

    // if user does not exist, throw error
    if (!user) throw new BadRequestError(null, 'Invalid email or password');

    // check if password is correct
    const passwordMatch = await Bun.password.verify(body.password, user.password);

    // if password is incorrect, throw error
    if (!passwordMatch) throw new BadRequestError(null, 'Invalid email or password');

    const accessToken = await new jose.SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRATION!)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    // generate refresh token
    const refreshToken = await this.userTokenGateway.createToken(user.id);

    return {
      user: {
        email: user.email,
        name: user.name,
        profile_color_code: user.profileColorCode,
        profile_first_char: user.profileFirstChar,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
