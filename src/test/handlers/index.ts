import { allocateEmployeeHandlers } from './allocateEmployeeHandlers'
import { attendanceReportHandlers } from './attendanceReportHandlers'
import { birthdaysListHandlers } from './birthdaysListHandlers'
import { categoryListHandlers } from './categoryListHandlers'
import { certificateListHandlers } from './certificateListHandler'
import { clientsHandlers } from './clientsHandlers'
import { employeeHandbookSettingsHandlers } from './employeeHandbookSettingsHandlers'
import { employeeAchievementsHandlers } from './employeeAchievementsHandlers'
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
import { eventTypeListHandlers } from './eventTypeListHandlers'
import { trackerHandlers } from './addTrackerListHandlers'
import { eventListHandlers } from './eventListHandlers'
import { employeeHandbookHandlers } from './employeeHandbookHandlers'
import { employeeLeaveHistoryHandlers } from './employeeLeaveHistoryHandlers'
import { employeeSearchHandler } from './employeeSearchHandler'
import { employeeSkillHandlers } from './employeeSkillsHandlers'
import { employeeCertificationHandlers } from './employeeCertificationsHandlers'
import { addNewClientHandlers } from './addNewClientHandlers'
import { addRoomListHandlers } from './addRoomListHandler'
import { addLocationListHandlers } from './addLocationListHandlers'

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
  ...employeeHandbookSettingsHandlers,
  ...employeeAchievementsHandlers,
  ...updateTicketHandlers,
  ...eventTypeListHandlers,
  ...trackerHandlers,
  ...eventListHandlers,
  ...employeeHandbookSettingsHandlers,
  ...employeeHandbookHandlers,
  ...employeeLeaveSummaryHandlers,
  ...employeeLeaveHistoryHandlers,
  ...employeeSearchHandler,
  ...employeeSkillHandlers,
  ...employeeCertificationHandlers,
  ...addNewClientHandlers,
  ...addRoomListHandlers,
  ...addLocationListHandlers,
  // add your handler here
]
