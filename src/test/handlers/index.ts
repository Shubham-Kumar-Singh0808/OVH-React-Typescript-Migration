import { categoryListHandlers } from './categoryListHandlers'
import { generalInformationHandlers } from './generalInformationHandlers'
import { loginHandlers } from './loginHandlers'
import { skillListHandlers } from './skillListHandlers'
import { userRolesAndPermissionsHandlers } from './userRolesAndPermissionsHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...userRolesAndPermissionsHandlers,
  ...skillListHandlers,
  ...generalInformationHandlers,
  // add your handler here
]
