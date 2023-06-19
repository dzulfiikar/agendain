import { User } from '../../core/entities/User';
import { CreatedResponse } from '../../frameworks/http/responses/CreatedResponse';
import { LoginPresentationData } from './presenter-data/LoginPresentationData';

export interface AuthenticationPresenter {
  presentLogin(acessToken: string, refreshToken: string): LoginPresentationData;
  presentRegister(user: User): CreatedResponse;
}
