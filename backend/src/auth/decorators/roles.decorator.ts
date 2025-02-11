import { SetMetadata } from '@nestjs/common';

export const Roles = (permission: string) =>
  SetMetadata('permission', permission);
