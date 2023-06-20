import { LoginDTO } from '../../../adapters/controllers/dtos/LoginDTO';

export interface LoginInteractor {
  execute(body: LoginDTO): Promise<any>;
}
