export interface AuthenticationController {
  register(body: any): Promise<void>;
}
