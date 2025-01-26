import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  // Deny access if the user is not logged in
  if (!user || !user.roles) return false

  // Allow access if the user is an admin
  if (user.roles.includes('admin')) return true

  // Allow access if the user is updating their own record
  return {
    id: {
      equals: user.id,
    },
  }
}
