import { RegisterDTO } from '../../../adapters/controllers/dtos/RegisterDTO';
import { User } from '../../entities/User';

export interface RegisterInteractor {
  execute(registerDTO: RegisterDTO): Promise<User>;
}
