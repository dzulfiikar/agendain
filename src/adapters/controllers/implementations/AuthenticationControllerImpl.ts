import { RegisterInteractor } from '../../../core/usecases/authentication/RegisterInteractor';
import { AuthenticationPresenter } from '../../presenters/AuthenticationPresenter';
import { AuthenticationController } from '../AuthenticationController';
import { RegisterDTO } from '../dtos/RegisterDTO';

export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(
    private readonly registerInteractor: RegisterInteractor,
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async register(body: any): Promise<any> {
    const registerDTO = body as RegisterDTO;
    const registerResponse = await this.registerInteractor.execute(registerDTO);
    return this.authenticationPresenter.presentRegister(registerResponse);
  }
}
