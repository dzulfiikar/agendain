import { RefreshLoginPresentationData } from '../../../adapters/presenters/presenter-data/RefreshLoginPresentationData';

export interface RefreshLoginInteractor {
  execute(token: string): Promise<RefreshLoginPresentationData>;
}
