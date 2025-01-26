import { User } from '@/payload-types'
import { AccessArgs } from 'payload'
type requireRole = (role: User['roles']) => (arg: AccessArgs<User>) => boolean
export const requireRole: requireRole =
  (roles: Exclude<User['roles'], null | undefined>) =>
  ({ req: { user } }) => {
    if (!roles || roles === null)
      throw new Error('You must provide a role to check against in requireRole')
    if (!user || !user.roles) return false
    // user can access if they have any of the roles
    return user.roles.some((r) => roles.includes(r))
  }
