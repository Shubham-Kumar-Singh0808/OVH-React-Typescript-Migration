import { categoryListHandlers } from './categoryListHandlers'
import { employeeShiftsHandlers } from './employeeShiftsHandlers'
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
  ...employeeShiftsHandlers,
  // add your handler here
]
