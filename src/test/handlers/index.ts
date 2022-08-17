import { attendanceReportHandlers } from './attendanceReportHandlers'
import { categoryListHandlers } from './categoryListHandlers'
import { certificateListHandlers } from './certificateListHandler'
import { employeeListHandlers } from './employeeListHandlers'
import { employeeShiftsHandlers } from './employeeShiftsHandlers'
import { generalInformationHandlers } from './generalInformationHandlers'
import { hiveActivityReportHandlers } from './hiveActivityReportHandlers'
import { loginHandlers } from './loginHandlers'
import { skillListHandlers } from './skillListHandlers'
import { userAccessToFeaturesHandlers } from './userAccessToFeaturesHandlers'
import { userRolesAndPermissionsHandlers } from './userRolesAndPermissionsHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...userRolesAndPermissionsHandlers,
  ...skillListHandlers,
  ...generalInformationHandlers,
  ...employeeShiftsHandlers,
  ...employeeListHandlers,
  ...certificateListHandlers,
  ...attendanceReportHandlers,
  ...userAccessToFeaturesHandlers,
  ...hiveActivityReportHandlers,
  // add your handler here
]
