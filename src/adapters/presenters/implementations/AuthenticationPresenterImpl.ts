import { User } from '../../../core/entities/User';
import { CreatedResponse } from '../../../frameworks/http/responses/CreatedResponse';
import { AuthenticationPresenter } from '../AuthenticationPresenter';
import { RegisterPresentationData } from '../presenter-data/RegisterPresentationData';

export class AuthenticationPresenterImpl implements AuthenticationPresenter {
  presentRegister(user: User): CreatedResponse {
    return new CreatedResponse({
      email: user.email,
      name: user.name,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    } as RegisterPresentationData);
  }

  presentLogin(acessToken: string, refreshToken: string): any {
    throw new Error('Method not implemented.');
  }
}
