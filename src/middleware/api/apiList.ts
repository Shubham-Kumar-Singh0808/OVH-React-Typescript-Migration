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
  UserRolesConfigurationApi,
  EmployeeReportApi,
  EmployeeDesignationReportApi,
  VisaListApi,
  TimeInOfficeReportApi,
  EmployeeLeaveSettingsApi,
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
  getEmployeeProjects: apiPrefix + '/project-mgmt/getEmployeeProjectslist',
  getProjectDetails: apiPrefix + '/allocation-mgmt/directoryProjects',
}

export const employeeHandbookSettingsApiConfig: EmployeeHandbookSettingsApi = {
  getEmployeeHandbooks: apiPrefix + '/handbookItem/getAll',
  deleteEmployeeHandbook: apiPrefix + '/handbookItem/delete',
  addNewHandbook: apiPrefix + '/handbookItem/add',
  getEmployeeCountries: apiPrefix + '/jobapplicant/getEmpCountries',
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
  getAllemploymentType: apiPrefix + '/jobapplicant/getEmploymentType',
  getAllJobType: apiPrefix + '/jobapplicant/getJobType',
  getCheckIfUserExist: apiPrefix + '/Employee/isemployeeUsernameexist',
}
