import { CanActivate, Type } from "@nestjs/common";
import { createModuleContextGuard } from "./module-context.guard";

export type ResolverOperationNames = {
  read: { one: { name: string }; many: { name: string } };
  create: { one: { name: string }; many: { name: string } };
  update: { one: { name: string }; many: { name: string } };
  delete: { one: { name: string }; many: { name: string } };
  guards:Type<CanActivate>[];
};

export function buildResolverOperationNames(singular: string, plural: string, guards: Type<CanActivate>[]): ResolverOperationNames {
  return {
    read: { one: { name: `find${singular}` }, many: { name: `find${plural}` } },
    create: { one: { name: `create${singular}` }, many: { name: `create${plural}` } },
    update: { one: { name: `update${singular}` }, many: { name: `update${plural}` } },
    delete: { one: { name: `delete${singular}` }, many: { name: `delete${plural}` } },
    guards: [...guards, createModuleContextGuard(singular)]
  };
}