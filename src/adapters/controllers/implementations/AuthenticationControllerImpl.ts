import { LoginInteractor } from '../../../core/usecases/authentication/LoginInteractor';
import { ProfileInteractor } from '../../../core/usecases/authentication/ProfileInteractor';
import { RefreshLoginInteractor } from '../../../core/usecases/authentication/RefreshLoginInteractor';
import { RegisterInteractor } from '../../../core/usecases/authentication/RegisterInteractor';
import { CreatedResponse } from '../../../frameworks/http/responses/CreatedResponse';
import { SuccessResponse } from '../../../frameworks/http/responses/SuccessResponse';
import { AuthenticationPresenter } from '../../presenters/AuthenticationPresenter';
import { AuthenticationController } from '../AuthenticationController';
import { LoginDTO } from '../dtos/LoginDTO';
import { RegisterDTO } from '../dtos/RegisterDTO';

export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(
    private readonly registerInteractor: RegisterInteractor,
    private readonly loginInteractor: LoginInteractor,
    private readonly profileInteractor: ProfileInteractor,
    private readonly refreshLoginInteractor: RefreshLoginInteractor,
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async login(body: unknown): Promise<SuccessResponse> {
    const loginDTO = body as LoginDTO;
    const loginResponse = await this.loginInteractor.execute(loginDTO);
    return this.authenticationPresenter.presentLogin(loginResponse);
  }

  async register(body: unknown): Promise<CreatedResponse> {
    const registerDTO = body as RegisterDTO;
    const registerResponse = await this.registerInteractor.execute(registerDTO);
    return this.authenticationPresenter.presentRegister(registerResponse);
  }

  async profile(userId: string): Promise<SuccessResponse> {
    const profileResponse = await this.profileInteractor.execute(userId);
    return this.authenticationPresenter.presentProfile(profileResponse);
  }

  async refreshLogin(body: any): Promise<SuccessResponse> {
    const refreshLoginResponse = await this.refreshLoginInteractor.execute(body.token);
    return this.authenticationPresenter.presentRefreshLogin(refreshLoginResponse);
  }
}
