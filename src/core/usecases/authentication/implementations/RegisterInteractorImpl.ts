import { RegisterDTO } from '../../../../adapters/controllers/dtos/RegisterDTO';
import { UserGateway } from '../../../../adapters/gateways/UserGateway';
import { UserMongoGateway } from '../../../../adapters/gateways/UserMongoGateway';
import { RegisterPresentationData } from '../../../../adapters/presenters/presenter-data/RegisterPresentationData';
import { BadRequestError } from '../../../../frameworks/http/errors/BadRequestError';

import { RegisterInteractor } from '../RegisterInteractor';

export class RegisterInteractorImpl implements RegisterInteractor {
  constructor(private readonly userGateway: UserGateway, private readonly userMongoGateway: UserMongoGateway) {}

  async execute(registerDTO: RegisterDTO): Promise<RegisterPresentationData> {
    const checkUserExists = await this.userGateway.getUserByEmail(registerDTO.email);
    console.log('ASD');
    if (checkUserExists) throw new BadRequestError(null, 'Email already exists');

    registerDTO.password = await Bun.password.hash(registerDTO.password, {
      algorithm: 'bcrypt',
      cost: 12,
    });

    const user = await this.userGateway.createUser(registerDTO);

    if (!user) throw new BadRequestError(null, 'Error creating user');

    await this.userMongoGateway.createUser(user);

    return {
      name: user!.name,
      email: user!.email,
      profile_color_code: user!.profileColorCode,
      profile_first_char: user!.profileFirstChar,
      created_at: user!.createdAt,
      updated_at: user!.updatedAt,
    }!;
  }
}
