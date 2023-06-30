export interface RefreshLoginPresentationData {
  user: {
    email: string;
    name: string;
    profile_color_code: string;
    profile_first_char: string;
    created_at: Date;
    updated_at: Date;
  };
  access_token: string;
  refresh_token: string;
}
