import { UserGateway } from '../../../../adapters/gateways/UserGateway';
import { ProfilePresentationData } from '../../../../adapters/presenters/presenter-data/ProfilePresentationData';

export default class ProfileInteractorImpl implements ProfileInteractorImpl {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(userId: string): Promise<ProfilePresentationData> {
    const user = await this.userGateway.getUserById(userId);
    return {
      email: user!.email,
      name: user!.name,
      created_at: user!.createdAt,
      updated_at: user!.updatedAt,
    };
  }
}
