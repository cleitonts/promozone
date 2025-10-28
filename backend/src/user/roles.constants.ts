// Hard-coded roles options, decoupled from permissions system
export const AVAILABLE_ROLES = [
  'admin',
  'support',
  'manager',
  'viewer',
] as const

export type AvailableRole = typeof AVAILABLE_ROLES[number]