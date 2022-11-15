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
  EventListApi,
  AddTrackerApi,
  AllocateEmployeeApi,
  AppraisalConfigurationsApi,
  RoomListApi,
  AddConfigurationsApi,
  TicketConfigurationApi,
} from '../../types/apiTypes'

const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws'

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
}

export const eventTypeListApiConfig: EventTypeListApi = {
  getAllEventTypes: apiPrefix + '/meetingRequest/getAllEventTypes',
  addEventType: apiPrefix + '/meetingRequest/addEventType',
  deleteEventType: apiPrefix + '/meetingRequest/deleteEventType',
  updateEventType: apiPrefix + '/meetingRequest/updateEventType',
  getLoggedEmployeeName: apiPrefix + '/meetingRequest/getLoggedEmployeeName',
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
}

export const addTrackerApiConfig: AddTrackerApi = {
  addNewTracker: apiPrefix + '/supportManagement/addTracker',
  deleteTracker: apiPrefix + '/supportManagement/deleteTracker',
}

export const appraisalConfigurationsApiConfig: AppraisalConfigurationsApi = {
  getAppraisalCycle: apiPrefix + '/appraisal/cycle',
}
export const addConfigurationsApiConfig: AddConfigurationsApi = {
  addAppraisalCycle: apiPrefix + '/appraisal/cycle',
}

export const roomListApiConfig: RoomListApi = {
  getAllMeetingRooms: apiPrefix + '/meetingRequest/getAllMeetingRooms',
  addRoom: apiPrefix + '/meetingRequest/addRoom',
  deleteRoom: apiPrefix + '/meetingRequest/deleteRoom',
  updateRoom: apiPrefix + '/meetingRequest/updateRoom',
}

export const ticketConfigurationApiConfig: TicketConfigurationApi = {
  getDepartments: apiPrefix + '/supportManagement/getDepartmentNameList',
  getCategories: apiPrefix + '/supportManagement/departmentCategoryList',
  getSubCategories: apiPrefix + '/supportManagement/subCategoryList',
  getSubCategoryList: apiPrefix + '/supportManagement/getSearchSubCategoryList',
  deleteSubCategory: apiPrefix + '/supportManagement/deleteSubCategory',
  ticketHistory: apiPrefix + '/supportManagement/getAudit',
  addSubCategory: apiPrefix + '/supportManagement/addSubCategory',
}
