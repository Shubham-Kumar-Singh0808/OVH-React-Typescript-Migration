/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
// Todo: remove eslint and fix error

import {
  AddNewEmployeeAPi,
  AuthenticationApi,
  BasicInfoApi,
  CategoryApi,
  CertificateListApi,
  CertificateTypeApi,
  EmployeeAssetsApi,
  EmployeeAttendanceReportApi,
  EmployeeCertificationsApi,
  EmployeeDesignationListApi,
  EmployeeGeneralInformationApi,
  EmployeeHandbookSettingsApi,
  EmployeeListApi,
  EmployeeProjectsApi,
  EmployeeQualificationCategoryApi,
  EmployeeQualificationsApi,
  EmployeeReporteesApi,
  EmployeeReviewsApi,
  EmployeeSkillApi,
  PersonalInfoApi,
  ProfileHistoryApi,
  ShiftConfigurationApi,
  SideMenuApi,
  SkillApi,
  UserAccessToFeaturesApi,
  UserRolesConfigurationApi,
  EmployeeReportApi,
  EmployeeDesignationReportApi,
  VisaListApi,
  EmployeeHandbook,
  DisplayHandbook,
  TimeInOfficeReportApi,
  EmployeeLeaveSettingsApi,
  HiveActivityReportApi,
  EmployeeMailConfigurationApi,
  AddNewTemplateApi,
  ApplyLeaveApi,
  ScheduledInterviewsApi,
  AddNewMailTemplateTypeApi,
  MyAttendanceApi,
  LeaveReportsApi,
  TicketReportApi,
  ClientsApi,
  ProjectManagementApi,
  AddNewClientApi,
  ClientInformationApi,
  LeaveSummaryApi,
  TicketListInformationApi,
  TicketApprovalsApi,
  RaiseNewTicketApi,
  DashboardApi,
  UpdateTicketApi,
  BookingListApi,
  EventTypeListApi,
  EmployeeAllocationApi,
  AddLocationListApi,
  NewBookingApi,
  EventListApi,
  AddTrackerApi,
  AllocateEmployeeApi,
  AppraisalConfigurationsApi,
  RoomListApi,
  AddConfigurationsApi,
  TicketConfigurationApi,
  NewEventApi,
  SubmitResignationApi,
  LeaveApprovalsApi,
  ITDeclarationFormApi,
  PaySlipsApi,
  BankDetailsApi,
  PanDetailsApi,
  ResignationListApi,
  EmployeeAccountsApi,
  ITDeclarationListApi,
  InvestmentCheckListApi,
  AchieverListApi,
  CommonAchievementsApi,
  ProjectCreationRequestApi,
  AddAchieverApi,
  ProjectDetailsApi,
  ProjectTimeLineApi,
  ProjectChangeRequestApi,
  ProjectMilestoneApi,
  ProjectInvoiceApi,
  ProjectTailoringApi,
  ProjectTimeSheetApi,
  ProjectProposalApi,
  ProjectNotesApi,
  InitiateCycleApi,
  MyKRAsApi,
  NomineeListApi,
  AddNomineeApi,
  MyReviewApi,
  LeadershipEnrollmentFormApi,
  PIPListApi,
  LeadershipEnrollmentListApi,
  KRAApi,
  AddProjectCreationRequestApi,
  PayrollManagementApi,
  ReviewListApi,
  AppraisalTemplateApi,
  ProjectStatusApi,
  ProcessAreaListApi,
  AddNewAudit,
  SQAAuditReportApi,
  NotificationsApi,
  JobOpeningsApi,
  VendorListApi,
  ChangeReporteesApi,
  ManufacturerApi,
  ProductTypeListApi,
  AssetWarrantyReportApi,
  AssetListApi,
  ProductSpecificationListApi,
  AddAssetListApi,
} from '../../types/apiTypes'

const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws/'

export enum AllowedHttpMethods {
  get = 'get',
  post = 'post',
  update = 'update',
  delete = 'delete',
  put = 'put',
}

export enum ApiLoadingState {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
  success = 'success',
}

export const authenticationApiConfig: AuthenticationApi = {
  login: apiPrefix + '/auth/login',
  logout: apiPrefix + '/user/logoutUser',
}

export const sideMenuApiConfig: SideMenuApi = {
  getMenuData: apiPrefix + '/roleFeature/menuItems',
}

export const userRolesConfigurationApiConfig: UserRolesConfigurationApi = {
  getUserRoles: apiPrefix + '/roleFeature/roles',
  isUserRoleExists: apiPrefix + '/roleFeature/isRoleExits',
  createUserRole: apiPrefix + '/roleFeature/role',
  deleteUserRole: apiPrefix + '/roleFeature/deleterole',
  getSubFeatures: apiPrefix + '/roleFeature/SubFeatures',
  featuresUnderRole: apiPrefix + '/roleFeature/features_UnderRole',
  assignPermission: apiPrefix + '/roleFeature/assignPermission',
}

export const categoriesApiConfig: CategoryApi = {
  getAllCategories: apiPrefix + '/jobapplicant/getAllCategories',
  addCategory: apiPrefix + '/jobapplicant/addCategory',
  deleteCategory: apiPrefix + '/jobapplicant/deleteCategory',
}
export const personalInfoApiConfig: PersonalInfoApi = {
  getFamilyDetails: apiPrefix + '/Employee/familyInformation',
  getVisaDetails: apiPrefix + '/Employee/getEmployeeVisaDetailsList',
  getCountryDetails: apiPrefix + '/Employee/getCountryLookUps',
  getVisaTypeDetails: apiPrefix + '/Employee/getCountryChangeList',
  addNewVisaMember: apiPrefix + '/Employee/saveVisaDetails',
  getFamilyInformation: apiPrefix + '/Employee/getFamilyInformation',
  updateFamilyInformation: apiPrefix + '/Employee/updateFamilyInformation',
  addNewFamilyMember: apiPrefix + '/Employee/saveFamilyInformation',
  getVisaInformation: apiPrefix + '/Employee/getVisaDetails',
  updateVisaInformation: apiPrefix + '/Employee/updateVisaDetailsToEmployee',
  deleteFamilyMember: apiPrefix + '/Employee/deleteFamilymember',
  deleteVisaDetail: apiPrefix + '/Employee/deleteVisaDetail',
  fileUploadVisaImage: apiPrefix + '/fileUpload/uploadVisaImage',
  fileUploadPassportImage: apiPrefix + '/fileUpload/uploadPassPortFrontImage',
}

export const skillsApiConfig: SkillApi = {
  getSkillListForCategory: apiPrefix + '/jobapplicant/getCategorySkill',
  addNewSkillForCategory:
    apiPrefix + '/jobapplicant/addSkillToSpecificCategory',
  deleteSkillForCategory: apiPrefix + '/jobapplicant/deleteSkill',
}

export const employeeSkillsApiConfig: EmployeeSkillApi = {
  getEmployeeSkills: apiPrefix + '/jobapplicant/getEmployeeskillList',
  addEmployeeSkill: apiPrefix + '/jobapplicant/addSkillToEmployee',
  getEmployeeSkillInformation: apiPrefix + '/jobapplicant/editSkill',
  updateEmployeeSkillInformation:
    apiPrefix + '/jobapplicant/updateEmployeeSkill',
  deleteEmployeeSkill: apiPrefix + '/jobapplicant/deleteEmployeeSkill',
  getEmployeeSkillsById: apiPrefix + '/jobapplicant/getEmployeeskills',
}

export const employeeQualificationCategoryApiConfig: EmployeeQualificationCategoryApi =
  {
    getQualificationCategories:
      apiPrefix + '/Employee/getQualiactionCategoryList',
    createQualificationCategory: apiPrefix + '/Employee/saveQualiCategory',
    deleteQualificationCategory: apiPrefix + '/Employee/deleteQualiCategory',
  }

export const employeeGeneralInformationApi: EmployeeGeneralInformationApi = {
  getLoggedInEmployeeData: apiPrefix + '/jobapplicant/loggedInEmployee',
}

export const employeeGeneralInformationApiConfig: EmployeeGeneralInformationApi =
  {
    getLoggedInEmployeeData: apiPrefix + '/jobapplicant/loggedInEmployee',
  }

export const qualificationsApiConfig: EmployeeQualificationsApi = {
  getEmployeeQualifications: apiPrefix + '/Employee/getEmployeeQualification',
  addEmployeeQualifications: apiPrefix + '/Employee/saveNewQualification',
  getPostGraduationAndGraduationLookUp:
    apiPrefix + '/Employee/multipleSelection',
  updateEmployeeQualifications: apiPrefix + '/Employee/updateQualification',
}

export const profileHistoryConfig: ProfileHistoryApi = {
  getprofileHistory: apiPrefix + '/Employee/getEmployeeProfileHistory',
}
export const employeeCertificationsApiConfig: EmployeeCertificationsApi = {
  getEmployeeCertificates: apiPrefix + '/Employee/certification/',
  getTechnologies: apiPrefix + '/jobapplicant/getAllTechnology',
  getCertificateByTechnology:
    apiPrefix + '/EmployeeSkill/getCertificateByTechnology',
  createEmployeeCertification: apiPrefix + '/Employee/certification',
  getEmployeeCertificate: apiPrefix + '/Employee/getCertification',
  updateEmployeeCertificate: apiPrefix + '/Employee/certification',
  deleteEmployeeCertificate: apiPrefix + '/Employee/certification',
  getEmployeeCertificateById: apiPrefix + '/Employee/employeeCertification',
}

export const basicInfoApiConfig: BasicInfoApi = {
  defaultPicByGender: apiPrefix + '/jobapplicant/defaultPic',
  updateEmployeeDetails: apiPrefix + '/jobapplicant/updateEmployeeDetails',
  uploadEmployeeCV: apiPrefix + '/fileUpload/uploadRBTResume',
  uploadEmployeeImage: apiPrefix + '/fileUpload/uploadImage',
  downloadEmployeeCV: apiPrefix + '/jobapplicant/downloadRBTCv',
  downloadSampleCV: apiPrefix + '/jobapplicant/downloadCVFormateFile',
}

export const employeeListConfig: EmployeeListApi = {
  getEmployeeList: apiPrefix + '/jobapplicant/EmployeesIndexData',
  exportEmployeeData: apiPrefix + '/jobapplicant/exportEmployeeData',
}

export const employeeDesignationListApiConfig: EmployeeDesignationListApi = {
  getEmployeeDepartments: apiPrefix + '/assetManagement/getEmpDepartments',
  getEmployeeDesignations: apiPrefix + '/kra/designation',
  addEmployeeDesignation: apiPrefix + '/jobapplicant/addDesignation',
  deleteEmployeeDesignation: apiPrefix + '/jobapplicant/deleteDesignation',
  getAllEmployeeDesignation: apiPrefix + '/jobapplicant/getAllDesignations',
}

export const shiftConfigurationApiConfig: ShiftConfigurationApi = {
  getAllShifts: apiPrefix + '/jobapplicant/getAllShifting',
  addTimeSlot: apiPrefix + '/jobapplicant/addTimeSlot',
  updateShiftDetail: apiPrefix + '/jobapplicant/updateShiftDetail',
  deleteShiftDetail: apiPrefix + '/jobapplicant/deleteShiftDetail',
}

export const employeeReporteesApiConfig: EmployeeReporteesApi = {
  getEmployeeReportees: apiPrefix + '/jobapplicant/getReportiesUnderManager',
  getEmployeeReporteesKRAs: apiPrefix + '/kra/kraForIndividual',
  getEmployeeReporteesKPIs: apiPrefix + '/kra/kpisForIndividualKra',
}

export const certificateListApiConfig: CertificateListApi = {
  getAllEmployeeCertificates:
    apiPrefix + '/EmployeeSkill/getAllEmployeecertificates',
  exportCertificateList: apiPrefix + '/EmployeeSkill/exportCertificatesList',
}

export const employeeAssetsApiConfig: EmployeeAssetsApi = {
  getEmployeeAssets: apiPrefix + '/Employee/getEmployeeAssets',
}

export const certificateTypeApiConfig: CertificateTypeApi = {
  getCertificateTypes: apiPrefix + '/EmployeeSkill/getCertificateTypeList',
  addCertificateType: apiPrefix + '/EmployeeSkill/addCertificateType',
  deleteCertificateType: apiPrefix + '/EmployeeSkill/deleteCertificateType',
  checkIsCertificateTypeExists:
    apiPrefix + '/EmployeeSkill/checkForDuplicateCertificate',
  getCertificateType: apiPrefix + '/EmployeeSkill/editCertificateType',
  updateCertificateType: apiPrefix + '/EmployeeSkill/updateCertificatetype',
}

export const employeeReviewsApiConfig: EmployeeReviewsApi = {
  getEmployeeReviews: apiPrefix + '/jobapplicant/getLoggedInEmployeeReviews',
}

export const employeeReportApiConfig: EmployeeReportApi = {
  getEmployeeReports: apiPrefix + '/jobapplicant/getSelectedTypeEmployeeData',
  getCountries: apiPrefix + '/jobapplicant/getEmpCountries',
}

export const employeeDesignationReportApiConfig: EmployeeDesignationReportApi =
  {
    getAllDesignations: apiPrefix + '/jobapplicant/getAllDesignations',
    getEmployeeCategoryData: apiPrefix + '/jobapplicant/EmployeesCategoryData',
    exportEmployeeCategoryData:
      apiPrefix + '/jobapplicant/exportEmployeeCategoryData',
  }

export const visaListApiConfig: VisaListApi = {
  getVisaList: apiPrefix + '/EmployeeSkill/getAllVisaDetails',
  getCountries: apiPrefix + '/EmployeeSkill/getCountries',
  getVisaTypes: apiPrefix + '/Employee/getCountryChangeList',
  exportVisaList: apiPrefix + '/EmployeeSkill/exportEmployeeVisaList',
}

export const employeeProjectsApiConfig: EmployeeProjectsApi = {
  getProjectsClients: apiPrefix + '/project-mgmt/getClients',
  getEmployeeProjects: apiPrefix + '/project-mgmt/getEmployeeProjectslist',
  getProjectDetails: apiPrefix + '/allocation-mgmt/directoryProjects',
}

export const employeeHandbook: EmployeeHandbook = {
  getHandbooks: apiPrefix + '/handbookItem/getHandbookNamesCountryWise',
}

export const dispHandbook: DisplayHandbook = {
  dispHandbook: apiPrefix + '/handbookItem/get',
}

export const employeeAttendanceReportApiConfig: EmployeeAttendanceReportApi = {
  getEmployeeAttendance: apiPrefix + '/biometric/bioAdminManager/attendance',
  exportAttendance: apiPrefix + '/biometric/exportAttendance',
  exportBiometricAttendance: apiPrefix + '/biometric/exportAttendance2',
}

export const userApiConfig: UserAccessToFeaturesApi = {
  getUserAccessToFeatures: apiPrefix + '/roleFeature/user',
}

export const employeeHandbookSettingsApiConfig: EmployeeHandbookSettingsApi = {
  getEmployeeHandbooks: apiPrefix + '/handbookItem/getAll',
  deleteEmployeeHandbook: apiPrefix + '/handbookItem/delete',
  addNewHandbook: apiPrefix + '/handbookItem/add',
  getEmployeeCountries: apiPrefix + '/jobapplicant/getEmpCountries',
  getTotalHandbookList: apiPrefix + '/handbookItem/getTotalList',
  getSelectedCountries: apiPrefix + '/handbookItem/getSelectedCountries',
  updateEmployeeHandbook: apiPrefix + '/handbookItem/updateHandbookItem',
}

export const timeInOfficeReportApiConfig: TimeInOfficeReportApi = {
  getTimeInOfficeEmployeeReport:
    apiPrefix + '/timeInOffice/getTimeInOfficeEmployeeReport',
  getTimeInOfficeManagerReport:
    apiPrefix + '/timeInOffice/getTimeInOfficeManagerReport',
  exportAttendanceReport: apiPrefix + '/timeInOffice/exportAttendanceReport',
}

export const employeeLeaveSettingsApiConfig: EmployeeLeaveSettingsApi = {
  saveLeaveCalendarSettings:
    apiPrefix + '/leaveSetup/bioAdmin/leaveCalendarSettings',
  getLeaveCategories: apiPrefix + '/leaveSetup/leaveCategoriesForAdmin',
  getLeaveCalenderSettings:
    apiPrefix + '/leaveSetup/bioAdminManager/leaveCalendarSettings',
  deleteLeaveCategory: apiPrefix + '/leaveSetup/bioAdmin/leaveCategory',
  addUpdateLeaveCategory: apiPrefix + '/leaveSetup/bioAdmin/leaveCategory',
}

export const addNewEmployeeAPiConfig: AddNewEmployeeAPi = {
  getEmployeeDepartments: apiPrefix + '/assetManagement/getEmpDepartments',
  getEmpCountries: apiPrefix + '/jobapplicant/getEmpCountries',
  getAllHrData: apiPrefix + '/jobapplicant/getAllHrData',
  getAllReportingManagersData:
    apiPrefix + '/jobapplicant/getAllReportingManagersData',
  addNewEmployee: apiPrefix + '/jobapplicant/jobAdmin/addNewEmployee',
  editEmployee: apiPrefix + '/jobapplicant/jobAdmin/editEmployee',
  getAllemploymentType: apiPrefix + '/jobapplicant/getEmploymentType',
  getAllJobType: apiPrefix + '/jobapplicant/getJobType',
  getCheckIfUserExist: apiPrefix + '/Employee/isemployeeUsernameexist',
}

export const hiveActivityReportApiConfig: HiveActivityReportApi = {
  getEmployeeHiveActivityReport:
    apiPrefix + '/timeActivity/employeeHiveReports',
  getManagerHiveActivityReport: apiPrefix + '/timeActivity/managerHiveReports',
  getSearchHiveTime: apiPrefix + '/timeActivity/searchHiveTime',
  exportHiveReport: apiPrefix + '/timeActivity/exportHiveReport',
}

export const employeeMailConfigurationApiConfig: EmployeeMailConfigurationApi =
  {
    getMailTemplates: apiPrefix + '/mailTemplates/getMailTemplates',
    getMailTemplateTypes: apiPrefix + '/mailTemplates/getMailTemplateTypes',
    exportMailTemplatesList: apiPrefix + '/mailTemplates/exportMailTemplates',
    updateMailTemplate: apiPrefix + '/mailTemplates/updateMailTemplate',
    deleteMailTemplate: apiPrefix + '/mailTemplates/deleteMailTemplate',
  }

export const addNewTemplateApiConfig: AddNewTemplateApi = {
  getAssetTypes: apiPrefix + '/assetManagement/getAllLookUps',
  addNewMailTemplate: apiPrefix + '/mailTemplates/addMailTemplate',
}

export const applyLeaveAPiConfig: ApplyLeaveApi = {
  getLeaveType: apiPrefix + '/leaveSetup/leaveCategories',
  applyLeave: apiPrefix + '/leave/apply',
}

export const scheduledInterviewsApiConfig: ScheduledInterviewsApi = {
  searchScheduledCandidatesForEmployee:
    apiPrefix + '/jobapplicant/searchScheduledCandidatesForEmployee',
  searchScheduledCandidates:
    apiPrefix + '/jobapplicant/searchScheduledCandidates',
  downloadScheduleCandidates:
    apiPrefix + '/jobapplicant/downloadScheduleCandidates',
}

export const addNewMailTemplateTypeAPiConfig: AddNewMailTemplateTypeApi = {
  getMailTemplateTypes: apiPrefix + '/mailTemplates/getMailTemplateTypes',
  addNewMailTemplateType: apiPrefix + '/mailTemplates/addMailTemplateType',
  updateMailTemplateType: apiPrefix + '/mailTemplates/updateMailTemplateType',
  deleteMailTemplateType: apiPrefix + '/mailTemplates/deleteMailTemplateType',
}

export const myAttendanceApiConfig: MyAttendanceApi = {
  getMyAttendance: apiPrefix + '/biometric/myAttendence',
}

export const leaveReportsApiConfig: LeaveReportsApi = {
  getLeaveSummaries: apiPrefix + '/leaveSetup/bioAdmin/leaveSummaries',
  searchLeaveSummaries: apiPrefix + '/leaveSetup/searchLeaveSummaries',
  creditedYears: apiPrefix + '/leaveSetup/creditedYears',
  financialYear: apiPrefix + '/leaveSetup/financialYear',
  downloadLeaveReportList: apiPrefix + '/leaveSetup/exportLeaveReport',
}
export const allocateEmployeeApiConfig: AllocateEmployeeApi = {
  getAllEmployeeProfiles:
    apiPrefix + '/jobapplicant/getAllProfileEmployeesData?searchStr',
  getAllProjectSearch: apiPrefix + '/allocation-mgmt/getAllProjectSearch',
  allocateNewEmployee: apiPrefix + '/allocation-mgmt/allocation',
}

export const ticketReportApiConfig: TicketReportApi = {
  getDepartmentNameList: apiPrefix + '/supportManagement/getDepartmentNameList',
  departmentCategoryList:
    apiPrefix + '/supportManagement/departmentCategoryList',
  getTicketsReport: apiPrefix + '/supportManagement/getTicketsReport',
  getTicketsDetails: apiPrefix + '/supportManagement/getTicketsDetails',
  exportTicketReports: apiPrefix + '/supportManagement/exportReportList',
}

export const projectManagementConfig: ProjectManagementApi = {
  addProject: apiPrefix + '/project-mgmt/project',
  updateProject: apiPrefix + '/project-mgmt/project',
  getProject: apiPrefix + '/project-mgmt/project',
  getAllPlatforms: apiPrefix + '/project-mgmt/getAllPlatforms',
  getAllDomains: apiPrefix + '/project-mgmt/getAllDomains',
  getAllManagers: apiPrefix + '/project-mgmt/getAllManagers',
  getActiveProjectReports:
    apiPrefix + '/project-mgmt/activeProjectsForEmployee',
  getSearchAllocationReport: apiPrefix + '/project-mgmt/searchAllocationReport',
  getClientProjects: apiPrefix + '/allocation-mgmt/projects',
  getCloseProject: apiPrefix + '/project-mgmt/closeProject',
  getDeleteProject: apiPrefix + '/project-mgmt/projectDelete',
  postDeallocateProject: apiPrefix + '/project-mgmt/deAllocateProject',
  postUpdateAllocateProject: apiPrefix + '/project-mgmt/updateAllocateProject',
  exportProjectList: apiPrefix + '/project-mgmt/exportProjectList',
}

export const clientsApiConfig: ClientsApi = {
  getClients: apiPrefix + '/project-mgmt/client',
  getProjectsUnderClient: apiPrefix + '/project-mgmt/projectsUnderClient',
  searchClients: apiPrefix + '/project-mgmt/searchClients',
  deleteClient: apiPrefix + '/project-mgmt/deleteClient',
  editClient: apiPrefix + '/project-mgmt/client',
  updateClient: apiPrefix + '/project-mgmt/updateClient',
  getClientCountries: apiPrefix + '/project-mgmt/country',
  clientOrg: apiPrefix + '/project-mgmt/clientOrg',
}

export const addNewClientApiConfig: AddNewClientApi = {
  getClientCountries: apiPrefix + '/project-mgmt/country',
  addNewClient: apiPrefix + '/project-mgmt/client',
  checkClientOrgExist: apiPrefix + '/project-mgmt/clientOrg',
}

export const clientInformationApiConfig: ClientInformationApi = {
  getClientInformation: apiPrefix + '/project-mgmt/getClientInfo',
}

export const leaveSummaryApiConfig: LeaveSummaryApi = {
  getEmployeeLeaveSummary: apiPrefix + '/leave/leaveSummary',
  getEmployeeLeaveHistory: apiPrefix + '/leave/leaves',
  cancelEmployeeLeave: apiPrefix + '/leave/cancel',
  cancelAfterApproval: apiPrefix + '/leave/cancelAfterApproval',
}

export const ticketListInformationApiConfig: TicketListInformationApi = {
  getTicketListInformation: apiPrefix + '/supportManagement/searchTicketData',
  exportTicketList: apiPrefix + '/supportManagement/exportRaisedTickets',
  ticketHistoryDetails: apiPrefix + '/supportManagement/getAudit',
  cancelTicket: apiPrefix + '/supportManagement/cancelTicketRequest',
}

export const ticketApprovalsApiConfig: TicketApprovalsApi = {
  getDepartmentNameList: apiPrefix + '/supportManagement/getDepartmentNameList',
  getAllTrackerList: apiPrefix + '/supportManagement/getAllTracker',
  getAllLookups: apiPrefix + '/supportManagement/getAllLookups',
  departmentCategoryList:
    apiPrefix + '/supportManagement/departmentCategoryList',
  subCategoryList: apiPrefix + '/supportManagement/subCategoryList',
  getAllTicketsForApproval:
    apiPrefix + '/supportManagement/getAllTicketsForApproval',
  exportTicketApprovalList:
    apiPrefix + '/supportManagement/exportTicketApprovalList',
  rejectManagerTicket: apiPrefix + '/supportManagement/rejectManagerTicket',
}

export const createNewTicketApiConfig: RaiseNewTicketApi = {
  createNewTicket: apiPrefix + '/supportManagement/createTickets',
  uploadSupportTicketsDocument:
    apiPrefix + '/fileUpload/uploadSupportTicketsDocuments',
}

export const dashboardApiConfig: DashboardApi = {
  getAllJobVacancies: apiPrefix + '/jobvacancy/getAllJobVacancies',
  getUpcomingBirthdayAnniversaries:
    apiPrefix + '/Employee/upcomingBirthdayAnniversaries',
  getAllEmployeesBirthdayList:
    apiPrefix + '/Employee/upcomingBirthdayAnniversaries',
  getUpcomingHolidays: apiPrefix + '/Employee/onlyUpcomingHolidays',
  getAllUpcomingHolidaysList: apiPrefix + '/Employee/upcomingHolidays',
  addHoliday: apiPrefix + '/Employee/saveHoliday',
  getFinancialYear: apiPrefix + '/leaveSetup/financialYear',
  getEmployeeTimeInOffice: apiPrefix + '/timeInOffice/weeklyTimeInOfficeReport',
  getUpcomingTrainings: apiPrefix + '/meetingRequest/getTrainingsForDashBoard',
  getUpcomingEvents: apiPrefix + '/meetingRequest/getEventsForDashBoard',
  getEmployeesUnderProbationPeriod: apiPrefix + '/Employee/provisionPeriod',
  getAllAchievements: apiPrefix + '/achievement/getAllAchievementList',
  deleteHoliday: apiPrefix + '/Employee/deleteHoliday',
  getHolidayInformation: apiPrefix + '/Employee/holiday',
  updateHoliday: apiPrefix + '/Employee/editHoliday',
  searchEmployee: apiPrefix + '/jobapplicant/getAllProfileEmployeesData',
  getLeaveSummary: apiPrefix + '/leave/leaveSummaryDashboard',
  imageFix: apiPrefix + 'profilepics/1857-Thumb.jpg',
}

export const addLocationListApiConfig: AddLocationListApi = {
  getAllMeetingLocations: apiPrefix + '/meetingRequest/getAllMeetingLocations',
  addLocation: apiPrefix + '/meetingRequest/addLocation',
  deleteLocation: apiPrefix + '/meetingRequest/deleteLocation',
}

export const updateTicketApiConfig: UpdateTicketApi = {
  getTicket: apiPrefix + '/supportManagement/getTicket',
  getActiveEmployeeList: apiPrefix + '/assetManagement/getActiveEmployeeList',
  getAudit: apiPrefix + '/supportManagement/getAudit',
  uploadSupportTicketDocuments:
    apiPrefix + '/fileUpload/uploadSupportTicketsDocuments',
  updateIndividualTickets:
    apiPrefix + '/supportManagement/editIndividualTickets',
  approveTicketByManager:
    apiPrefix + '/supportManagement/approveByManagerTicket',
}

export const bookingListApiConfig: BookingListApi = {
  getRoomsOfLocation: apiPrefix + '/meetingRequest/getRoomsOfLocation',
  getAllMeetingLocations: apiPrefix + '/meetingRequest/getAllMeetingLocations',
  getBookingsForSelection:
    apiPrefix + '/meetingRequest/getBookingsForSelection',
  cancelRoomBooking: apiPrefix + '/meetingRequest/changeMeetingStatus/',
  editMeeting: apiPrefix + '/meetingRequest/editmeeting',
  confirmUpdateMeetingRequest:
    apiPrefix + '/meetingRequest/confirmupdateMeetingRequest',
  uniqueAttendee:
    apiPrefix + '/meetingRequest/uniqueAttendeeuniqueAttendeeWithId',
  Completed: apiPrefix + '/meetingRequest/changeMeetingStatus/25301/Completed',
  InProgress:
    apiPrefix + '/meetingRequest/changeMeetingStatus/25304/In%20Progress',
}

export const eventTypeListApiConfig: EventTypeListApi = {
  getAllEventTypes: apiPrefix + '/meetingRequest/getAllEventTypes',
  addEventType: apiPrefix + '/meetingRequest/addEventType',
  deleteEventType: apiPrefix + '/meetingRequest/deleteEventType',
  updateEventType: apiPrefix + '/meetingRequest/updateEventType',
}

export const newEventApiConfig: NewEventApi = {
  getLoggedEmployeeName: apiPrefix + '/meetingRequest/getLoggedEmployeeName',
  getRoomsOfLocation: apiPrefix + '/meetingRequest/getRoomsOfLocation',
  getAllProfileEmployeesData:
    apiPrefix + '/jobapplicant/getAllProfileEmployeesData',
  getAllAttendees: apiPrefix + '/meetingRequest/getAllAttendies',
  uniqueAttendee: apiPrefix + '/meetingRequest/uniqueAttendee',
  timeChecking: apiPrefix + '/meetingRequest/timechecking',
  getAllBookedDetailsForEvent:
    apiPrefix + '/meetingRequest/getAllBookedDetailsForEvent',
  addNewEvent: apiPrefix + '/meetingRequest/addNewEvent',
}

export const employeeAllocationApiConfig: EmployeeAllocationApi = {
  getEmployeeAllocationReport: apiPrefix + '/project-mgmt/searchByEmployeeName',
  projectUnderEmployees: apiPrefix + '/project-mgmt/projectUnderEmployees/',
  updateEmployeeAllocateProject:
    apiPrefix + '/project-mgmt/updateEmployeeAllocateProject',
  downloadEmployeeAllocationList: apiPrefix + '/project-mgmt/exportFile',
}

export const eventListApiConfig: EventListApi = {
  getAllEvents: apiPrefix + '/meetingRequest/getAllEvents',
  cancelEvent: apiPrefix + '/meetingRequest/cancelEvent',
  getFeedbackFormList: apiPrefix + '/meetingRequest/getFeedbackFormList',
  downloadFeedbackForm: apiPrefix + '/meetingRequest/downloadFeedbackForm',
  uploadFeedbackForm:
    apiPrefix + '/fileUpload/uploadMeetingRequestFeedbackForm',
  editEvent: apiPrefix + '/meetingRequest/editmeeting',
  updateEvent: apiPrefix + '/meetingRequest/updateEvent',
}

export const addTrackerApiConfig: AddTrackerApi = {
  addNewTracker: apiPrefix + '/supportManagement/addTracker',
  deleteTracker: apiPrefix + '/supportManagement/deleteTracker',
}

export const appraisalConfigurationsApiConfig: AppraisalConfigurationsApi = {
  cycle: apiPrefix + '/appraisal/cycle',
  editAppraisalCycle: apiPrefix + '/appraisal/getCycle',
  updateAppraisalCycle: apiPrefix + '/appraisal/updateCycle',
  validateCycle: apiPrefix + '/appraisal/validateCycle',
}
export const addConfigurationsApiConfig: AddConfigurationsApi = {
  addAppraisalCycle: apiPrefix + '/appraisal/cycle',
}

export const roomListApiConfig: RoomListApi = {
  getAllMeetingRooms: apiPrefix + '/meetingRequest/getAllMeetingRooms',
  addRoom: apiPrefix + '/meetingRequest/addRoom',
  deleteRoom: apiPrefix + '/meetingRequest/deleteRoom',
  updateRoom: apiPrefix + '/meetingRequest/updateRoom',
  getRoomsOfLocation: apiPrefix + '/meetingRequest/getRoomsOfLocation',
  getAllMeetingLocations: apiPrefix + '/meetingRequest/getAllMeetingLocations',
}

export const ticketConfigurationApiConfig: TicketConfigurationApi = {
  getDepartments: apiPrefix + '/supportManagement/getDepartmentNameList',
  getCategories: apiPrefix + '/supportManagement/departmentCategoryList',
  getSubCategories: apiPrefix + '/supportManagement/subCategoryList',
  getSubCategoryList: apiPrefix + '/supportManagement/getSearchSubCategoryList',
  deleteSubCategory: apiPrefix + '/supportManagement/deleteSubCategory',
  ticketHistory: apiPrefix + '/supportManagement/getAudit',
  addSubCategory: apiPrefix + '/supportManagement/addSubCategory',
  getAllCategory: apiPrefix + '/supportManagement/getAllCategoryList',
  deleteCategory: apiPrefix + '/supportManagement/deleteCategory',
  addCategory: apiPrefix + '/supportManagement/addCategory',
  updateCategory: apiPrefix + '/supportManagement/updateCategory',
  updateSubCategory: apiPrefix + '/supportManagement/updateSubCategory',
}

export const submitResignationApiConfig: SubmitResignationApi = {
  getSeparationForm: apiPrefix + '/separationController/getSeparationForm',
  submitResignation: apiPrefix + '/separationController/SubmitResignation',
  getEmployeeResg: apiPrefix + '/separationController/getEmployeeResg',
  revokeResignation: apiPrefix + '/separationController/revokeResignation',
}

export const leaveApprovalsApiConfig: LeaveApprovalsApi = {
  getEmployees: apiPrefix + '/managerAppraisalController/getEmployees',
  getEmployeeLeaves: apiPrefix + '/leave/bioAdminManager/employeeLeaves',
  getSearchEmployees: apiPrefix + '/leave/bioAdminManager/searchEmployees',
  checkProjectManagerExits: apiPrefix + '/leave/checkProjectManagerExits',
  leaveApprove: apiPrefix + '/leave/bioAdminManager/approve',
  leaveReject: apiPrefix + '/leave/bioAdminManager/reject',
}

export const payrollManagementApiConfig: PayrollManagementApi = {
  getCurrentPayslip: apiPrefix + '/payslip/payrolladmin/getCurrentPayslip',
  downloadExcelFile: apiPrefix + '/payslip/payrolladmin/downloadExcelFile',
  searchEmployee: apiPrefix + '/payslip/payrolladmin/searchEmployee',
  deletePayslip: apiPrefix + '/payslip/payrolladmin/deletePayslip',
  updatePayslip: apiPrefix + '/payslip/payrolladmin/updatePayslip',
  deleteCheckedPayslips:
    apiPrefix + '/payslip/payrolladmin/deleteCheckedPayslips',
  readExcelFile: apiPrefix + '/payslip/payrolladmin/readExcelFile',
  saveExcelFile: apiPrefix + '/payslip/payrolladmin/saveExcelFile',
  clearDirectory: apiPrefix + '/payslip/payrolladmin/clearDirectory',
}

export const itDeclarationFormApiConfig: ITDeclarationFormApi = {
  getEmployeeInfo: apiPrefix + '/itDeclaration/getEmployee',
  getSectionsHavingInvests:
    apiPrefix + '/itDeclaration/getSectionsHavingInvests',
  getInvestsBySectionId: apiPrefix + '/itDeclaration/getInvestsBySecId',
  addITDeclarationForm: apiPrefix + '/itDeclaration/addITDeclarationForm',
  isITDeclarationFormExist: apiPrefix + '/itDeclaration/isItDeclareExist',
  uploadITDocuments: apiPrefix + '/itDeclaration/uploadItDeclareDocuments',
}

export const paySlipsApiConfig: PaySlipsApi = {
  getEmployeePayslipsForSelectedYear:
    apiPrefix + '/payslip/getEmployeePayslipsForSelectedYear',
  generatePayslipAndDownloadPayslip:
    apiPrefix + '/payslip/payrolladmin/generatePayslipAndDownloadPayslip',
}

export const panDetailsApiConfig: PanDetailsApi = {
  bankInformation: apiPrefix + '/Employee/bankInformation',
  updateFinanceInformation: apiPrefix + '/Employee/updateFinanceInformation',
  uploadEmployeeFinanceDetails:
    apiPrefix + '/fileUpload/uploadEmployeeFinanceDetails',
  downloadFinanceFile: apiPrefix + '/Employee/downloadFinanceFile',
}

export const bankDetailsApiConfig: BankDetailsApi = {
  getBankNameLookup: apiPrefix + '/Employee/getBankNameLookup',
  saveBankInformation: apiPrefix + '/Employee/saveBankInformation',
  updateBankInformation: apiPrefix + '/Employee/updateBankInformation',
  deleteBankAccount: apiPrefix + '/Employee/deleteBankAccount',
  editBankInformation: apiPrefix + '/Employee/bankInformation',
}
export const resignationListApiConfig: ResignationListApi = {
  resignationList: apiPrefix + '/separationController/resignationList',
  exportResignationList:
    apiPrefix + '/separationController/exportResignationList',
  resignationInitiateCC: apiPrefix + '/separationController/IntitiateCC',
  getSeparationTimeLine: apiPrefix + '/separationController/getSeparation',
  clearanceCertificateComments:
    apiPrefix + '/separationController/clearanceCertificateComments',
  getClearanceDetails: apiPrefix + '/separationController/getClearanceDetails',
  updateCCDetails: apiPrefix + '/separationController/updateCC',
  checkExitFeedBackForm:
    apiPrefix + '/separationController/checkExitFeedBackForm',
  getSeparationChart: apiPrefix + '/separationController/getSeparationChart',
  getEmpDetails: apiPrefix + '/separationController/getEmpDetails',
  saveExitFeedBackForm:
    apiPrefix + '/separationController/saveExitFeedBackForm',
  uploadRelievingLetter: apiPrefix + '/fileUpload/uploadrelievingletter',
  uploadExitFeedBackFile: apiPrefix + '/fileUpload/uploadExitfeedBackFile',
  updateTimeLine: apiPrefix + '/separationController/updateSeparation',
}
export const itDeclarationListApiConfig: ITDeclarationListApi = {
  getCycles: apiPrefix + '/itDeclaration/getCycles',
  getSections: apiPrefix + '/itDeclaration/getSection',
  getITDeclarationForm: apiPrefix + '/itDeclaration/getItDeclarationForm',
  exportITDeclarationList: apiPrefix + '/itDeclaration/exportITDeclarationList',
  addCycle: apiPrefix + '/itDeclaration/addCycle',
  deleteSection: apiPrefix + '/itDeclaration/deleteSection',
  addSection: apiPrefix + '/itDeclaration/addSection',
  updateSection: apiPrefix + '/itDeclaration/editSection',
  getInvestments: apiPrefix + '/itDeclaration/getInvestments',
  addInvestment: apiPrefix + '/itDeclaration/addInvestment',
  deleteInvestment: apiPrefix + '/itDeclaration/deleteInvestment',
  deleteCycle: apiPrefix + '/itDeclaration/deleteCycle',
  isCycleExist: apiPrefix + '/itDeclaration/isCycleExist',
  updateCycle: apiPrefix + '/itDeclaration/editCycle',
  updateInvestment: apiPrefix + '/itDeclaration/updateInvestment',
  isInvestmentExist: apiPrefix + '/itDeclaration/isInvestmentExist',
  isSectionExist: apiPrefix + '/itDeclaration/isSectionExist',
  getEmployeeDetails: apiPrefix + '/itDeclaration/getEmployee',
  isITFormEditable: apiPrefix + '/itDeclaration/isItFormEditable',
  editITForm: apiPrefix + '/itDeclaration/editItForm',
}
export const InvestmentCheckListApiConfig: InvestmentCheckListApi = {
  getInvestments: apiPrefix + '/itDeclaration/getInvestsBySecId',
  getSections: apiPrefix + '/itDeclaration/getSection',
}
export const reviewListApiConfig: ReviewListApi = {
  getEmployeeDepartments: apiPrefix + '/assetManagement/getEmpDepartments',
  getReviewList: apiPrefix + '/appraisal/getSearchResult',
  getAppraisalCycles: apiPrefix + '/appraisal/cycle',
  getDesignations: apiPrefix + '/kra/designation',
  exportReviewList: apiPrefix + '/appraisal/exportAppraisalList',
  activeCycle: apiPrefix + '/appraisal/activeCycle',
}
export const CommonAchievementsApiConfig: CommonAchievementsApi = {
  getAllAchievementsType: apiPrefix + '/achievement/getAllAchievementType',
}
export const AchieverListApiConfig: AchieverListApi = {
  getAchieverList: apiPrefix + '/achievement/getAllAchievement',
  updateShowOnDashbord: apiPrefix + '/achievement/showOnDashBoard',
  achievementHistoryTimeline: apiPrefix + '/achievement/getAchievementHistory',
}
export const addProjectCreationRequestApiConfig: AddProjectCreationRequestApi =
  {
    getCheckList: apiPrefix + '/project-mgmt/getCheckList',
    getProjectRequestMailIds:
      apiPrefix + '/project-mgmt/getProjectRequestMailIds',
    addProjectRequest: apiPrefix + '/project-mgmt/projectRequest',
  }
export const ProjectCreationRequestApiConfig: ProjectCreationRequestApi = {
  getAllProjectRequestList:
    apiPrefix + '/project-mgmt/getAllProjectRequestList',
  getProjectRequest: apiPrefix + '/project-mgmt/getProjectRequest',
  getAuditForProjectRequest:
    apiPrefix + '/project-mgmt/getAuditForProjectRequest',
  getApproveProjectRequest: apiPrefix + '/project-mgmt/getProjectRequest',
  updateProjectRequest: apiPrefix + '/project-mgmt/project',
  deleteProjectRequest: apiPrefix + '/project-mgmt/deleteProjectRequest',
  rejectProjectRequest: apiPrefix + '/project-mgmt/rejectProjectRequest',
}
export const AddAchieverApiConfig: AddAchieverApi = {
  addAchievementType: apiPrefix + '/achievement/addAchievementType',
  getAchievementTypeDetails:
    apiPrefix + '/achievement/getAchievementTypeDetails',
  updateAchievementTypeDetails:
    apiPrefix + '/achievement/updateAchievementType',
  deleteAchievementType: apiPrefix + '/achievement/deleteAchievementType',
  getActiveEmployeeList: apiPrefix + '/assetManagement/getActiveEmployeeList',
  addAchievement: apiPrefix + '/achievement/addAchievement',
  getImageData: apiPrefix + '/achievement/getImageData',
}
export const NomineeListApiConfig: NomineeListApi = {
  getAllCycles: apiPrefix + '/nominationController/getallcycles',
  getNominations: apiPrefix + '/nominationController/getNominations',
  getNominationDetails:
    apiPrefix + '/nominationController/getNominationDetails',
  reviewNominee: apiPrefix + '/nominationController/reviewNominee',
  exportNomineeList: apiPrefix + '/nominationController/exportNomineesList',
}
export const AddNomineeApiConfig: AddNomineeApi = {
  nominationFormDetails:
    apiPrefix + '/nominationController/nominationFormDetails',
  addNominee: apiPrefix + '/nominationController/addNominee',
}
export const employeeAccountsApiConfig: EmployeeAccountsApi = {
  financeDetails: apiPrefix + '/Employee/financeDetails',
  exportFinanceList: apiPrefix + '/Employee/exportFinanceList',
}
export const projectViewApiConfig: ProjectDetailsApi = {
  getProjects: apiPrefix + '/allocation-mgmt/projects',
  getProject: apiPrefix + '/project-mgmt/project',
  updateProjectDetails: apiPrefix + '/project-mgmt/updateAllocateProject',
}
export const projectTimeLineApiConfig: ProjectTimeLineApi = {
  getProjectHistory: apiPrefix + '/project-mgmt/getProjectHistory',
}
export const projectChangeRequestApiConfig: ProjectChangeRequestApi = {
  getCRList: apiPrefix + '/project-mgmt/getCRList',
  changeRequest: apiPrefix + '/project-mgmt/changeRequest',
  deleteCR: apiPrefix + '/project-mgmt/deleteCR',
  updateChangeRequest: apiPrefix + '/project-mgmt/updateChangeRequest',
}
export const projectMileStoneApiConfig: ProjectMilestoneApi = {
  mileStonesList: apiPrefix + '/project-mgmt/mileStonesList',
}
export const projectInvoicesApiConfig: ProjectInvoiceApi = {
  getClosedMilestonesAndCRs:
    apiPrefix + '/project-mgmt/getClosedMilestonesandCRs',
  getInvoicesOfMilestone: apiPrefix + '/invoice/getInvoicesOfMilestone',
  getInvoiceSummary: apiPrefix + '/invoice/getInvoiceSummary',
}
export const projectTailoringApiConfig: ProjectTailoringApi = {
  getProjectTailoringDocument:
    apiPrefix + '/projectTailoring/getProjectTailoringDocument',
  getProjectTailoring: apiPrefix + '/projectTailoring/getProjectTailoring',
  saveProjectTailoringDocumentForManager:
    apiPrefix + '/projectTailoring/saveProjectTailoringDocumentForManager',
  saveProjectTailoringDocument:
    apiPrefix + '/projectTailoring/saveProjectTailoringDocument',
}
export const projectTimeSheetApiConfig: ProjectTimeSheetApi = {
  getProjectTimeSheet: apiPrefix + '/allocation-mgmt/getProjectTimeSheet',
}
export const projectProposalsApiConfig: ProjectProposalApi = {
  projectProposal: apiPrefix + '/project-mgmt/projectProposal',
}
export const projectNotesApiConfig: ProjectNotesApi = {
  projectNotesTimeLine: apiPrefix + '/projectnewsfeed/',
  uploadImage: apiPrefix + '/projectnewsfeed/uploadImage',
}
export const initiateCycleApiConfig: InitiateCycleApi = {
  getActiveCycleData: apiPrefix + '/nominationController/getActiveCycleData',
  getallcycles: apiPrefix + '/nominationController/getallcycles',
  getAllQuestions: apiPrefix + '/nominationController/getAllQuestions',
  initiateCycle: apiPrefix + '/nominationController/initiateCycle',
  deleteQuestion: apiPrefix + '/nominationController/deleteQuestion',
  addQuestion: apiPrefix + '/nominationController/addQuestion',
  addCycle: apiPrefix + '/nominationController/addCycle',
  editCycle: apiPrefix + '/nominationController/editCycle',
  updateCycle: apiPrefix + '/nominationController/updateCycle',
}
export const myKRAsApiConfig: MyKRAsApi = {
  getKRAForIndividualEmployee: apiPrefix + '/kra/kraForIndividual',
  getKPIsForIndividualEmployee: apiPrefix + '/kra/kpisForIndividualKra',
}
export const newBookingApiConfig: NewBookingApi = {
  getLoggedEmployeeName: apiPrefix + '/meetingRequest/getLoggedEmployeeName',
  getAllProfileEmployeesData:
    apiPrefix + '/jobapplicant/getAllProfileEmployeesData',
  getAllProjectSearch: apiPrefix + '/allocation-mgmt/getAllProjectSearch',
  confirmNewMeetingAppointment:
    apiPrefix + '/meetingRequest/confirmNewMeetingAppointment',
  getAllMeetingAppointmentList:
    apiPrefix + '/meetingRequest/getAllMeetingAppointmentList',
}
export const LeadershipEnrollmentFormApiConfig: LeadershipEnrollmentFormApi = {
  employeeDetails: apiPrefix + '/achievement/getEmployeeDetails',
  addLeadership: apiPrefix + '/achievement/addLeadership',
}
export const LeadershipEnrollmentListApiConfig: LeadershipEnrollmentListApi = {
  getLeadershipList: apiPrefix + '/achievement/getLeadershipList',
  leadershipApprove: apiPrefix + '/achievement/leadershipApprove',
  leadershipReject: apiPrefix + '/achievement/leadershipReject',
}
export const KRAApiConfig: KRAApi = {
  getEmpDepartments: apiPrefix + '/assetManagement/getEmpDepartments',
  getDesignation: apiPrefix + '/kra/designation',
  searchKRAData: apiPrefix + '/kra/searchKRAData',
  kpiForIndividualKra: apiPrefix + '/kra/kpisForIndividualKra',
  deleteKRA: apiPrefix + '/kra/',
  deleteKPI: apiPrefix + '/kra/',
  designationKRAPercentage: apiPrefix + '/kra/designationKraPercentage',
  checkIfNewKRADuplicate: apiPrefix + '/kra/',
  addNewKRA: apiPrefix + '/kra/',
  editThisKra: apiPrefix + '/kra/',
  updateKRA: apiPrefix + '/kra/',
  getFrequency: apiPrefix + '/kra/frequencyList',
  addKPI: apiPrefix + '/kra/',
  updateKPI: apiPrefix + '/kra/updateKpi',
  checkIfNewKpiDuplicate: apiPrefix + 'kra/',
}
export const myReviewApiConfig: MyReviewApi = {
  getEmployeePerformanceReview: apiPrefix + '/handbookItem/get',
}
export const PipListApiConfig: PIPListApi = {
  getAllPIPList: apiPrefix + '/PIPManagement/getAllPIPList',
  exportPIPList: apiPrefix + '/PIPManagement/exportPIPList',
  getPerformanceRatings: apiPrefix + '/observation-mgnt/getPerformanceRatings',
  activeEmployee: apiPrefix + '/observation-mgnt/activeEmployee/',
  addPIP: apiPrefix + '/PIPManagement/addPIP',
  viewPipDetails: apiPrefix + '/PIPManagement/viewPipDetails',
  getPIPHistory: apiPrefix + '/PIPManagement/getPIPHistory',
  extendPip: apiPrefix + '/PIPManagement/extendPip',
  removeFromPip: apiPrefix + '/PIPManagement/removeFromPip',
  updatePipDetails: apiPrefix + '/PIPManagement/updatePipDetails',
  savePIPClearnceCertificate:
    apiPrefix + '/PIPManagement/savePIPClearnceCertificate',
}
export const AppraisalTemplateApiConfig: AppraisalTemplateApi = {
  cycle: apiPrefix + '/appraisal/cycle',
  activeCycle: apiPrefix + '/appraisal/activeCycle',
  getDesignationsUnderCycle: apiPrefix + '/appraisal/getDesignationsUnderCycle',
}
export const projectStatusApiConfig: ProjectStatusApi = {
  statusReportLis: apiPrefix + '/project-mgmt/statusReportList',
  addStatusReport: apiPrefix + '/project-mgmt/statusReports',
  deleteStatusReport: apiPrefix + '/project-mgmt/statusReportDelete',
  updateStatusReport: apiPrefix + '/project-mgmt/updateStatusreport',
}
export const processAreaApiConfig: ProcessAreaListApi = {
  getProjectTailoringDocument:
    apiPrefix + '/projectTailoring/getProjectTailoringDocument',
  getProcessAreas: apiPrefix + '/projectTailoring/getProcessAreas',
  createProcessArea: apiPrefix + '/projectTailoring/createProcessArea',
  checkDuplicateProcess: apiPrefix + '/projectTailoring/checkDuplicateProcess',
  saveProcessArea: apiPrefix + '/projectTailoring/saveProcessArea',
  incrementOrDecrementOrder:
    apiPrefix + '/projectTailoring/incrementOrDecrementOrder',
  getOrderCountOfActiveProcesses:
    apiPrefix + '/projectTailoring/getOrderCountOfActiveProcesses',
  getProcessAreaDetails: apiPrefix + '/projectTailoring/getProcessAreaDetails',
  checkforDuplicateDoc: apiPrefix + '/projectTailoring/checkforDuplicateDoc',
}
export const addNewAuditApiConfig: AddNewAudit = {
  saveNewAuditForm: apiPrefix + '/sqaAuditController/saveOrSubmitAuditForm',
  editAuditFormDetails: apiPrefix + '/sqaAuditController/getAuditDetails',
  getProjectEmployees: apiPrefix + '/allocation-mgmt/getProjectEmployees',
  updateSQAAuditForm: apiPrefix + '/sqaAuditController/updateAuditForm',
}
export const sqaAuditReportApiConfig: SQAAuditReportApi = {
  getSQAAuditReport: apiPrefix + '/sqaAuditController/getSQAAuditReport',
  exportSqaAuditReport: apiPrefix + '/sqaAuditController/exportSqaAuditReport',
  deleteProjectAuditDetails:
    apiPrefix + '/sqaAuditController/deleteProjectAuditDetails',
  closeAudit: apiPrefix + '/sqaAuditController/closeAudit',
  getNewSQAAuditTimelineDetails:
    apiPrefix + '/sqaAuditController/getNewSQAAuditTimelineDetails',
  getAuditDetails: apiPrefix + '/sqaAuditController/getAuditDetails',
  saveOrSubmitAuditForm:
    apiPrefix + '/sqaAuditController/saveOrSubmitAuditForm',
  downloadSQAAuditFile: '/sqaAuditController/downloadSQAAuditFile',
}
export const notificationsApiConfig: NotificationsApi = {
  allAlerts: apiPrefix + '/alert/allAlerts',
  updateAlert: apiPrefix + '/alert/updateAlert',
}
export const jobOpeningsApiConfig: JobOpeningsApi = {
  getAllJobVacancies: apiPrefix + '/jobvacancy/getAllJobVacancies',
  getAllTechnology: apiPrefix + '/jobapplicant/getAllTechnology',
  addJobVacancy: apiPrefix + '/jobvacancy/jobAdmin/addJobVacancy',
  deleteJobVacancy: apiPrefix + '/jobvacancy/jobAdmin/deleteJobVacancy',
  getJobOpeningById: apiPrefix + '/jobapplicant/getJobOpeningById',
  getJobVacancyAudit: apiPrefix + '/jobvacancy/getJobVacancyAudit',
  updateJobVacancy: apiPrefix + '/jobvacancy/jobAdmin/updateJobVacancy',
  isCandidateMappedWithJob:
    apiPrefix + '/jobapplicant/jobAdmin/isCandidateMappedWithJob',
}
export const vendorListApiConfig: VendorListApi = {
  getAllVendorDetails: apiPrefix + '/assetManagement/getAllVendorDetails',
  getDepartmentNameList: apiPrefix + '/assetManagement/getDepartmentNameList',
  addVendorDetails: apiPrefix + '/assetManagement/addVendorDetails',
  exportVendorData: apiPrefix + '/assetManagement/exportVendorList',
  deleteVendorDetails: apiPrefix + '/assetManagement/deleteVendorDetails',
  editVendorDetails: apiPrefix + '/assetManagement/updateVendorDetails',
}

export const ChangeReporteesAPiConfig: ChangeReporteesApi = {
  getAllReportingManagerData:
    apiPrefix + '/delegation/getAllReportingManagerData',
  getAllHRList: apiPrefix + '/delegation/getAllHRList',
  getEmployeesUnderManger: apiPrefix + '/delegation/getMangerUnderEmployees',
  getHrAssociates: apiPrefix + '/delegation/getHrAssociates',
  updateReportingManager: apiPrefix + '/delegation/updateReportingManager',
  updateHrAssociatesManager: apiPrefix + '/delegation/updateHrAssociates',
}
export const ManufacturerApiListConfig: ManufacturerApi = {
  getAllManufacturerName: apiPrefix + '/assetManagement/getAllManufacturerName',
  exportManufacturerList: apiPrefix + '/assetManagement/exportManufacturerList',
  getAllLookUps: apiPrefix + '/assetManagement/getAllLookUps',
  addManufacturer: apiPrefix + '/assetManagement/addManufacturer',
  deleteManufacturerName: apiPrefix + '/assetManagement/deleteManufacturerName',
  updateManufacturerName: apiPrefix + '/assetManagement/updateManufacturerName',
}
export const GetProductTypeListConfig: ProductTypeListApi = {
  getProductTypeList: apiPrefix + '/assetManagement/getAllProductTypes',
  deleteProduct: apiPrefix + '/assetManagement/deleteProduct',
  exportProductList: apiPrefix + '/assetManagement/exportProductList',
  getAllLookUps: apiPrefix + '/assetManagement/getAllLookUps',
  addProduct: apiPrefix + 'assetManagement/addProduct',
  updateProduct: apiPrefix + 'assetManagement/updateProduct',
}
export const assetWarrantyReportConfig: AssetWarrantyReportApi = {
  getWarrantyAssetsList: apiPrefix + '/assetManagement/getWarrantyAssetsList',
  downloadExportAssetWarrantyList:
    apiPrefix + '/assetManagement/exportAssetWarrantyList',
}

export const GetAssetListConfig: AssetListApi = {
  getAllLookUps: apiPrefix + '/assetManagement/getAllLookUps',
  getAssetTypeChange: apiPrefix + '/assetManagement/getassetTypeChangeList',
  getAllAssets: apiPrefix + '/assetManagement/getAllAssets',
}
export const ProductSpecificationListReportApiConfig: ProductSpecificationListApi =
  {
    getAllProductSpecifications:
      apiPrefix + '/assetManagement/getAllProductSpecifications',
    getAllLookUps: apiPrefix + '/assetManagement/getAllLookUps',
    getassetTypeChangeList:
      apiPrefix + '/assetManagement/getassetTypeChangeList',
    getProductTypeChangeList:
      apiPrefix + '/assetManagement/getProductTypeChangeList',
    exportProductSpecificationList:
      apiPrefix + '/assetManagement/exportProductSpecificationList',
    addProductSpecifications:
      apiPrefix + '/assetManagement/addProductSpecifications',
    updateProductSpecification:
      apiPrefix + '/assetManagement/updateProductSpecification',
    deleteProductSpecification:
      apiPrefix + '/assetManagement/deleteProductSpecification',
  }
export const GetAddAssetListConfig: AddAssetListApi = {
  addAsset: apiPrefix + '/assetManagement/addAsset',
  updateAddAsset: apiPrefix + '/assetManagement/updateAssetDetails',
  checkAssetNumberExixts: apiPrefix + '/assetManagement/checkAssetNumberExixts',
  typeChangeSpecifications:
    apiPrefix + '/assetManagement/typeChangeSpecifications',
}
