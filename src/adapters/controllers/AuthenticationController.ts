import { CreatedResponse } from '../../frameworks/http/responses/CreatedResponse';
import { SuccessResponse } from '../../frameworks/http/responses/SuccessResponse';

export interface AuthenticationController {
  login(body: unknown): Promise<SuccessResponse>;
  register(body: unknown): Promise<CreatedResponse>;
  profile(userId: string): Promise<SuccessResponse>;
}
