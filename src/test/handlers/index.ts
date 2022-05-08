import { categoryListHandlers } from './categoryListHandlers'
import { loginHandlers } from './loginHandlers'
import { skillListHandlers } from './skillListHandlers'
import { userRolesAndPermissionsHandlers } from './userRolesAndPermissionsHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...userRolesAndPermissionsHandlers,
  ...skillListHandlers,
  // add your handler here
]
