import { Method, ResponseType } from 'axios'

export type AuthenticatedRequestConfig = {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
  params?: { [key: string]: string | number | boolean | undefined | number[] }
  paramsSerializer: any
  data?:
    | { [key: string]: string | number | unknown }
    | unknown
    | string
    | number
  responseType?: ResponseType
}

export interface ApiBase {
  get?: string
  insert?: string
  update?: string
  delete?: string
}

export interface AuthenticationApi extends ApiBase {
  login: string
  logout: string
}
export interface SideMenuApi extends ApiBase {
  getMenuData: string
}

export interface CategoryApi extends ApiBase {
  getAllCategories: string
  addCategory: string
  deleteCategory: string
}
// export interface PersonalInfoApi extends ApiBase {
//   getFamilyDetails: string
//   getVisaDetails: string
//   getCountryDetails: string
//   getVisaTypeDetails: string
//   addNewVisaMember: string
//   getFamilyInformation: string
//   updateFamilyInformation: string
//   addNewFamilyMember: string
//   getVisaInformation: string
//   updateVisaInformation: string
//   deleteFamilyMember: string
//   deleteVisaDetail: string
//   fileUploadVisaImage: string
// }

export interface SkillApi extends ApiBase {
  getSkillListForCategory: string
  addNewSkillForCategory: string
  deleteSkillForCategory: string
}

export interface EmployeeSkillApi extends ApiBase {
  getEmployeeSkills: string
  addEmployeeSkill: string
  getEmployeeSkillInformation: string
  updateEmployeeSkillInformation: string
  deleteEmployeeSkill: string
  getEmployeeSkillsById: string
}

export interface EmployeeQualificationCategoryApi extends ApiBase {
  getQualificationCategories: string
  createQualificationCategory: string
  deleteQualificationCategory: string
}
export interface EmployeeGeneralInformationApi extends ApiBase {
  getLoggedInEmployeeData: string
}

// export interface PersonalInfoApi extends ApiBase {
//   getFamilyDetails: string
// }
export interface EmployeeQualificationsApi extends ApiBase {
  getEmployeeQualifications: string
  getPostGraduationAndGraduationLookUp: string
  addEmployeeQualifications: string
  updateEmployeeQualifications: string
}

export interface EmployeeCertificationsApi extends ApiBase {
  getEmployeeCertificates: string
  getTechnologies: string
  getCertificateByTechnology: string
  createEmployeeCertification: string
  getEmployeeCertificate: string
  updateEmployeeCertificate: string
  deleteEmployeeCertificate: string
  getEmployeeCertificateById: string
}

export interface UserRolesConfigurationApi extends ApiBase {
  getUserRoles: string
  isUserRoleExists: string
  createUserRole: string
  deleteUserRole: string
  getSubFeatures: string
  featuresUnderRole: string
  assignPermission: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
  getVisaDetails: string
  getCountryDetails: string
  getVisaTypeDetails: string
  addNewVisaMember: string
  getFamilyInformation: string
  updateFamilyInformation: string
  addNewFamilyMember: string
  getVisaInformation: string
  updateVisaInformation: string
  deleteFamilyMember: string
  deleteVisaDetail: string
  fileUploadVisaImage: string
  fileUploadPassportImage: string
}

export interface ProfileHistoryApi extends ApiBase {
  getprofileHistory: string
}
export interface BasicInfoApi extends ApiBase {
  defaultPicByGender: string
  updateEmployeeDetails: string
  uploadEmployeeCV: string
  uploadEmployeeImage: string
  downloadEmployeeCV: string
  downloadSampleCV: string
}

export interface EmployeeReviewsApi extends ApiBase {
  getEmployeeReviews: string
}
export interface EmployeeListApi extends ApiBase {
  getEmployeeList: string
  exportEmployeeData: string
}

export interface EmployeeDesignationListApi extends ApiBase {
  getEmployeeDepartments: string
  getEmployeeDesignations: string
  addEmployeeDesignation: string
  deleteEmployeeDesignation: string
  getAllEmployeeDesignation: string
}

export interface ShiftConfigurationApi extends ApiBase {
  getAllShifts: string
  addTimeSlot: string
  updateShiftDetail: string
  deleteShiftDetail: string
}

export interface CertificateListApi extends ApiBase {
  getAllEmployeeCertificates: string
  exportCertificateList: string
}

export interface EmployeeAssetsApi extends ApiBase {
  getEmployeeAssets: string
}

export interface CertificateTypeApi extends ApiBase {
  getCertificateTypes: string
  addCertificateType: string
  checkIsCertificateTypeExists: string
  deleteCertificateType: string
  getCertificateType: string
  updateCertificateType: string
}

export interface EmployeeProjectsApi extends ApiBase {
  getEmployeeProjects: string
  getProjectDetails: string
  getProjectsClients: string
}

export interface EmployeeReporteesApi extends ApiBase {
  getEmployeeReportees: string
  getEmployeeReporteesKRAs: string
  getEmployeeReporteesKPIs: string
}

export interface EmployeeReportApi extends ApiBase {
  getEmployeeReports: string
  getCountries: string
}

export interface EmployeeDesignationReportApi extends ApiBase {
  getAllDesignations: string
  getEmployeeCategoryData: string
  exportEmployeeCategoryData: string
}

export interface VisaListApi extends ApiBase {
  getVisaList: string
  getCountries: string
  getVisaTypes: string
  exportVisaList: string
}

export interface EmployeeHandbook extends ApiBase {
  getHandbooks: string
}

export interface DisplayHandbook extends ApiBase {
  dispHandbook: string
}

export interface EmployeeAttendanceReportApi extends ApiBase {
  getEmployeeAttendance: string
  exportAttendance: string
  exportBiometricAttendance: string
}

export interface UserAccessToFeaturesApi extends ApiBase {
  getUserAccessToFeatures: string
}

export interface EmployeeHandbookSettingsApi extends ApiBase {
  getTotalHandbookList: string
  getEmployeeCountries: string
  addNewHandbook: string
  getEmployeeHandbooks: string
  deleteEmployeeHandbook: string
}

export interface TimeInOfficeReportApi extends ApiBase {
  getTimeInOfficeEmployeeReport: string
  getTimeInOfficeManagerReport: string
}

export interface EmployeeLeaveSettingsApi extends ApiBase {
  saveLeaveCalendarSettings: string
  getLeaveCategories: string
  getLeaveCalenderSettings: string
  deleteLeaveCategory: string
  addUpdateLeaveCategory: string
}

export interface AddNewEmployeeAPi extends ApiBase {
  getEmployeeDepartments: string
  getEmpCountries: string
  getAllHrData: string
  getAllReportingManagersData: string
  addNewEmployee: string
  getAllemploymentType: string
  getAllJobType: string
  getCheckIfUserExist: string
  editEmployee: string
}

export interface HiveActivityReportApi extends ApiBase {
  getEmployeeHiveActivityReport: string
  getManagerHiveActivityReport: string
  getSearchHiveTime: string
  exportHiveReport: string
}
export interface EmployeeMailConfigurationApi extends ApiBase {
  getMailTemplates: string
  getMailTemplateTypes: string
  exportMailTemplatesList: string
  deleteMailTemplate: string
}

export interface AddNewTemplateApi extends ApiBase {
  getAssetTypes: string
  addNewMailTemplate: string
}
export interface ScheduledInterviewsApi extends ApiBase {
  searchScheduledCandidatesForEmployee: string
  searchScheduledCandidates: string
  downloadScheduleCandidates: string
}

export interface AddNewMailTemplateTypeApi extends ApiBase {
  getMailTemplateTypes: string
  addNewMailTemplateType: string
  deleteMailTemplateType: string
  updateMailTemplateType: string
}

export interface MyAttendanceApi extends ApiBase {
  getMyAttendance: string
}

export interface ProjectManagementApi extends ApiBase {
  getProject: string
  addProject: string
  updateProject: string
  getAllPlatforms: string
  getAllDomains: string
  getAllManagers: string
}

export interface ClientsApi extends ApiBase {
  getClients: string
  getProjectsUnderClient: string
  searchClients: string
  deleteClient: string
  editClient: string
  updateClient: string
  getClientCountries: string
}

export interface AddNewClientApi extends ApiBase {
  getClientCountries: string
  addNewClient: string
}

export interface ClientInformationApi extends ApiBase {
  getClientInformation: string
}

export interface LeaveSummaryApi extends ApiBase {
  getEmployeeLeaveSummary: string
  getEmployeeLeaveHistory: string
  cancelEmployeeLeave: string
}
export interface TicketListInformationApi extends ApiBase {
  getTicketListInformation: string
  exportTicketList: string
  ticketHistoryDetails: string
  cancelTicket: string
}
export interface TicketApprovalsApi extends ApiBase {
  getDepartmentNameList: string
  getAllTrackerList: string
  getAllLookups: string
  departmentCategoryList: string
  subCategoryList: string
  getAllTicketsForApproval: string
  exportTicketApprovalList: string
}
