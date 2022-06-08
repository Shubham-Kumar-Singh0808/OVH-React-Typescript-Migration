import {
  AuthenticationApi,
  BasicInfoApi,
  CategoryApi,
  EmployeeCertificationsApi,
  EmployeeGeneralInformationApi,
  EmployeeQualificationCategoryApi,
  EmployeeQualificationsApi,
  EmployeeSkillApi,
  PersonalInfoApi,
  ProfileHistoryApi,
  SideMenuApi,
  SkillApi,
  UserRolesConfigurationApi,
  ReviewsTabApi,
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
}

export const basicInfoApiConfig: BasicInfoApi = {
  defaultPicByGender: apiPrefix + '/jobapplicant/defaultPic',
  updateEmployeeDetails: apiPrefix + '/jobapplicant/updateEmployeeDetails',
  uploadEmployeeCV: apiPrefix + '/fileUpload/uploadRBTResume',
}

export const reviewsTabApiConfig: ReviewsTabApi = {
  getEmployeeReviews: apiPrefix + '/jobapplicant/getLoggedInEmployeeReviews',
}
