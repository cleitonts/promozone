import { Request } from 'express';
import { UserPayloadResponse } from 'src/auth/dto/user-payload.response';

export interface ApiRequest extends Request {
  user: UserPayloadResponse;
}
