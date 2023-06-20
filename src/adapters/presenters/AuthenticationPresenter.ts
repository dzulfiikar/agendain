import { CreatedResponse } from '../../frameworks/http/responses/CreatedResponse';
import { SuccessResponse } from '../../frameworks/http/responses/SuccessResponse';
import { LoginPresentationData } from './presenter-data/LoginPresentationData';
import { ProfilePresentationData } from './presenter-data/ProfilePresentationData';
import { RefreshLoginPresentationData } from './presenter-data/RefreshLoginPresentationData';
import { RegisterPresentationData } from './presenter-data/RegisterPresentationData';

export interface AuthenticationPresenter {
  presentLogin(data: LoginPresentationData): SuccessResponse;
  presentRegister(data: RegisterPresentationData): CreatedResponse;
  presentProfile(data: ProfilePresentationData): SuccessResponse;
  presentRefreshLogin(data: RefreshLoginPresentationData): SuccessResponse;
}
