import { CreatedResponse } from '../../../frameworks/http/responses/CreatedResponse';
import { SuccessResponse } from '../../../frameworks/http/responses/SuccessResponse';
import { AuthenticationPresenter } from '../AuthenticationPresenter';
import { LoginPresentationData } from '../presenter-data/LoginPresentationData';
import { ProfilePresentationData } from '../presenter-data/ProfilePresentationData';
import { RefreshLoginPresentationData } from '../presenter-data/RefreshLoginPresentationData';
import { RegisterPresentationData } from '../presenter-data/RegisterPresentationData';

export class AuthenticationPresenterImpl implements AuthenticationPresenter {
  presentLogin(data: LoginPresentationData): SuccessResponse {
    return new SuccessResponse(data);
  }
  presentRegister(data: RegisterPresentationData): CreatedResponse {
    return new CreatedResponse(data);
  }
  presentProfile(data: ProfilePresentationData): SuccessResponse {
    return new SuccessResponse(data);
  }
  presentRefreshLogin(data: RefreshLoginPresentationData): SuccessResponse {
    return new SuccessResponse(data);
  }
}
