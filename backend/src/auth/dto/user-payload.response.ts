import { EUserRole } from 'src/users/user-role.enum';

export class UserPayloadResponse {
  userId: string;
  username: string;
  roles: EUserRole[];
}
