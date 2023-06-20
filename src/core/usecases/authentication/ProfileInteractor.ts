import { ProfilePresentationData } from '../../../adapters/presenters/presenter-data/ProfilePresentationData';

export interface ProfileInteractor {
  execute(userId: string): Promise<ProfilePresentationData>;
}
