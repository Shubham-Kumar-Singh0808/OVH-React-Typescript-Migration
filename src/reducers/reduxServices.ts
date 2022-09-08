import addNewEmployeeService from './EmployeeDirectory/EmployeesList/AddNewEmployee'
import { appService } from './appSlice'
import { attendanceReportService } from './TimeAndAttendance/AttendanceReport/attendanceReportSlice'
import { authenticationService } from './Login/authenticationSlice'
import { basicInformationService } from './MyProfile/BasicInfoTab/basicInformatiomSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { certificateListService } from './EmployeeDirectory/CertificatesList/certificatesListSlice'
import { certificateTypeService } from './EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
import { employeeAssetsService } from './MyProfile/MyAssetsTab/employeeAssetsSlice'
import { employeeCertificateService } from './MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { employeeDesignationListService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import { employeeListService } from './EmployeeDirectory/EmployeesList/employeeListSlice'
import { employeeProjectsService } from './MyProfile/ProjectsTab/employeeProjectSlice'
import { employeeQualificationService } from './MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import { employeeReporteesService } from './MyProfile/ReporteesTab/employeeReporteesSlice'
import { employeeReviewsService } from './MyProfile/ReviewTab/employeeReviewsSlice'
import { employeeSkillServices } from './MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import { generalInformationService } from './MyProfile/GeneralTab/generalInformationSlice'
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { profileHistoryService } from './MyProfile/ProfileHistory/profileHistorySlice'
import { qualificationCategoryService } from './MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import { shiftConfigurationService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userAccessToFeaturesService } from './Settings/UserRolesConfiguration/userAccessToFeaturesSlice'
import { technologyService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/getAllTechnologySlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import { employeeReportService } from './EmployeeDirectory/EmployeeReport/'
import { employeeDesigationReportService } from './EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportSlice'
import { visaListService } from './EmployeeDirectory/VisaList/visaListSlice'
import { EmployeeHandbookService } from './EmployeeHandbook/employeeHandbookSlice'
import { ShowHandbookService } from './EmployeeHandbook/showHandbookSlice'
import { employeeHandbookSettingService } from './EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import { timeInOfficeReportService } from './TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportSlice'
import { employeeLeaveSettingsService } from './Settings/LeaveSettings/employeeLeaveSettingsSlice'
import { countryService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/countriesSlice'
import { hiveActivityReportService } from './TimeAndAttendance/HiveActivityReport/hiveActivityReportSlice'
import { employeeMailConfigurationService } from './Settings/MailConfiguration/employeeMailConfigurationSlice'
import { addTemplateService } from './Settings/MailConfiguration/AddTemplate/addMailTemplateSlice'
import { employeeService } from './EmployeeDirectory/EmployeesList/EditEmployee'
import { scheduledInterviewsService } from './Recruitment/ScheduledInterviews/scheduledInterviewsSlice'
import { mailTemplateTypeService } from './Settings/MailConfiguration/AddMailTemplateType/addMailTemplateTypeSlice'
import { myAttendanceService } from './TimeAndAttendance/MyAttendance/myAttendanceSlice'
import { leaveReportService } from './Leaves/LeaveReports/leaveReportSlice'
import { projectManagementService } from './ProjectManagement/Project/projectSlice'
import { clientsService } from './ProjectManagement/Clients/clientsSlice'
import { addNewClientService } from './ProjectManagement/Clients/AddClient/addNewClientSlice'
import { clientInformationService } from './ProjectManagement/Clients/ClientInformation/clientInformationSlice'
import { leaveSummaryService } from './Leaves/LeaveSummary/employeeLeaveSummarySlice'
import { myTicketsService } from './Support/MyTickets/myTicketsSlice'
import { ticketApprovalsService } from './Support/TicketApprovals/ticketApprovalsSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  employeeList: employeeListService,
  profileHistory: profileHistoryService,
  personalInformation: personalInfoService,
  userRolesAndPermissions: userRolesAndPermissionsService,
  employeeDesignation: employeeDesignationListService,
  newEmployee: addNewEmployeeService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
  employeeQualificationCategory: qualificationCategoryService,
  basicInformation: basicInformationService,
  generalInformation: generalInformationService,
  employeeSkill: employeeSkillServices,
  employeeReviews: employeeReviewsService,
  employeeProjects: employeeProjectsService,
  shiftConfiguration: shiftConfigurationService,
  employeeReportees: employeeReporteesService,
  certificateList: certificateListService,
  employeeAssets: employeeAssetsService,
  certificateType: certificateTypeService,
  employeeReports: employeeReportService,
  employeeDesignationReports: employeeDesigationReportService,
  visaList: visaListService,
  EmployeeHandbook: EmployeeHandbookService,
  ShowHandbook: ShowHandbookService,
  employeeAttendanceReport: attendanceReportService,
  userAccessToFeatures: userAccessToFeaturesService,
  employeeHandbookSettings: employeeHandbookSettingService,
  employeeLeaveSettings: employeeLeaveSettingsService,
  technology: technologyService,
  country: countryService,
  timeInOfficeReport: timeInOfficeReportService,
  hiveActivityReport: hiveActivityReportService,
  employeeMailConfiguration: employeeMailConfigurationService,
  addNewMailTemplate: addTemplateService,
  employee: employeeService,
  scheduledInterviews: scheduledInterviewsService,
  addNewMailTemplateType: mailTemplateTypeService,
  myAttendance: myAttendanceService,
  leaveReport: leaveReportService,
  projectManagement: projectManagementService,
  clients: clientsService,
  addClient: addNewClientService,
  clientInformation: clientInformationService,
  employeeLeaveSummary: leaveSummaryService,
  tickets: myTicketsService,
  ticketApprovals: ticketApprovalsService,
}
