import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';
import { Role } from '../../authorization/entities/role.entity';
import { Tenant } from '../../authorization/entities/tenant.entity';
import { EffectivePermission } from '../../authorization/authorization.service';

@ObjectType()
export class EffectivePermissionType {
  @Field()
  resource: string;

  @Field()
  action: string;

  @Field()
  name: string;
}

@ObjectType()
export class UserInfoResponse {
  @Field(() => User)
  user: User;

  @Field(() => [EffectivePermissionType])
  permissions: EffectivePermissionType[];

  @Field(() => [Role])
  roles: Role[];

  @Field(() => [Tenant])
  tenants: Tenant[];

  @Field({ nullable: true })
  currentTenantId?: string;
}