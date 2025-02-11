export type TPerfilPermissions = {
  [module: string]: string[];
};

export const PerfilPermissions: TPerfilPermissions = {
  USERS: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
  POSTS: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
  PERFIL: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
};
