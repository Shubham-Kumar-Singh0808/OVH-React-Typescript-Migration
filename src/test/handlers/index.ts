import { attendanceReportHandlers } from './attendanceReportHandlers'
import { birthdaysListHandlers } from './birthdaysListHandlers'
import { categoryListHandlers } from './categoryListHandlers'
import { certificateListHandlers } from './certificateListHandler'
import { clientsHandlers } from './clientsHandlers'
import { employeeListHandlers } from './employeeListHandlers'
import { employeeShiftsHandlers } from './employeeShiftsHandlers'
import { generalInformationHandlers } from './generalInformationHandlers'
import { hiveActivityReportHandlers } from './hiveActivityReportHandlers'
import { employeeLeaveSummaryHandlers } from './leaveSummaryHandlers'
import { loginHandlers } from './loginHandlers'
import { scheduledInterviewsHandlers } from './scheduledInterviewsHandlers'
import { skillListHandlers } from './skillListHandlers'
import { ticketApprovalsHandlers } from './ticketApprovalsHandlers'
import { upcomingBirthdaysHandlers } from './upcomingBirthdaysHandlers'
import { upcomingHolidaysHandlers } from './upcomingHolidaysHandlers'
import { upcomingTrainingsAndEventsHandlers } from './upcomingTrainingsAndEventsHandlers'
import { updateTicketHandlers } from './updateTicketHandlers'
import { userAccessToFeaturesHandlers } from './userAccessToFeaturesHandlers'
import { userRolesAndPermissionsHandlers } from './userRolesAndPermissionsHandlers'
import { timeInOfficeHandlers } from './weeklyTimeInOfficeHandlers'

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
  ...scheduledInterviewsHandlers,
  ...clientsHandlers,
  ...ticketApprovalsHandlers,
  ...upcomingTrainingsAndEventsHandlers,
  ...upcomingHolidaysHandlers,
  ...employeeLeaveSummaryHandlers,
  ...upcomingBirthdaysHandlers,
  ...birthdaysListHandlers,
  ...timeInOfficeHandlers,
  ...updateTicketHandlers,
  // add your handler here
]
