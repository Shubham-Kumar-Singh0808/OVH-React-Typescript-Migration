import { categoryListHandlers } from './categoryListHandlers'
import { loginHandlers } from './loginHandlers'
import { userRolesAndPermissionsHandlers } from './userRolesAndPermissionsHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...userRolesAndPermissionsHandlers,
  // add your handler here
]
