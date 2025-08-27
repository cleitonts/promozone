// Services
export { AuthorizationService } from './authorization.service';
export { PolicyService } from './services/policy.service';
export { PolicyEvaluatorService } from './services/policy-evaluator.service';
export { AuthorizationSeedService } from './seeds/authorization.seed';

// Exportar guards
export { PermissionsGuard } from './guards/permissions.guard';

// Exportar decorators
export { Permissions, PermissionsAny, PermissionsAll } from './decorators/permissions.decorator';
export { TenantId } from './decorators/tenant.decorator';

// Exportar entidades
export { Permission } from './entities/permission.entity';
export { Role } from './entities/role.entity';
export { RolePermission } from './entities/role-permission.entity';
export { UserRole } from './entities/user-role.entity';
export { Policy } from './entities/policy.entity';

// Exportar resolvers
export * from './resolvers';

// Exportar módulo
export { AuthorizationModule } from './authorization.module';

// Exportar tipos
export type { EffectivePermission, AuthorizationContext } from './authorization.service';
export type { PolicyCondition, PolicyConditionGroup, PolicyContext } from './services/policy-evaluator.service';
export type { PolicyEvaluationResult } from './services/policy.service';