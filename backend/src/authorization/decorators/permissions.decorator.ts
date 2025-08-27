import { SetMetadata } from '@nestjs/common';

/**
 * Chave para armazenar metadados de permissões
 */
export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator para especificar permissões necessárias para acessar um endpoint
 * 
 * @param permissions - Array de strings representando as permissões necessárias
 * 
 * Exemplo de uso:
 * @Permissions('users.read', 'users.write')
 * @Query(() => [User])
 * async getUsers() {
 *   // ...
 * }
 */
export const Permissions = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);

/**
 * Decorator para especificar que o endpoint requer pelo menos uma das permissões listadas
 * 
 * @param permissions - Array de strings representando as permissões (OR logic)
 */
export const PermissionsAny = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, { type: 'any', permissions });

/**
 * Decorator para especificar que o endpoint requer todas as permissões listadas
 * 
 * @param permissions - Array de strings representando as permissões (AND logic)
 */
export const PermissionsAll = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, { type: 'all', permissions });