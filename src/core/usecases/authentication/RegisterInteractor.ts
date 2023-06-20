import { RegisterDTO } from '../../../adapters/controllers/dtos/RegisterDTO';
import { RegisterPresentationData } from '../../../adapters/presenters/presenter-data/RegisterPresentationData';

export interface RegisterInteractor {
  execute(registerDTO: RegisterDTO): Promise<RegisterPresentationData>;
}
