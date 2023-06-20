export interface RefreshLoginPresentationData {
  user: {
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  access_token: string;
  refresh_token: string;
}
