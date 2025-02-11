import { Perfil } from '../../perfil/perfil.entity';

export class UserPayloadResponse {
  userId: string;
  username: string;
  perfil: Perfil;
}
