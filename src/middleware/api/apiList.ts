import {
  AuthenticationApi,
  BasicInfoApi,
  CategoryApi,
  EmployeeGeneralInformationApi,
  PersonalInfoApi,
  QualificationCategoryApi,
  QualificationsApi,
  SideMenuApi,
  SkillApi,
  UserRolesConfigurationApi,
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
export const personalInfoApi: PersonalInfoApi = {
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

export const qualificationCategoryApi: QualificationCategoryApi = {
  getAllQualificationCategories:
    apiPrefix + '/Employee/getQualiactionCategoryList',
  addNewQualificationCategory: apiPrefix + '/Employee/saveQualiCategory',
  deleteQualificationCategory: apiPrefix + '/Employee/deleteQualiCategory',
}
export const employeeGeneralInformationApiConfig: EmployeeGeneralInformationApi =
  {
    getLoggedInEmployeeData: apiPrefix + '/jobapplicant/loggedInEmployee',
  }
export const qualificationsApi: QualificationsApi = {
  getEmployeeQualifications: apiPrefix + '/Employee/getEmployeeQualification',
  getEmployeeSkillsList: apiPrefix + '/jobapplicant/getEmployeeskillList',
  getEmployeeCertificatesList: apiPrefix + '/Employee/certification/',
  addEmployeeQualifications: apiPrefix + '/Employee/saveNewQualification',
  getPostGraduationAndGraduationList: apiPrefix + '/Employee/multipleSelection',
  updateEmployeeQualifications: apiPrefix + '/Employee/updateQualification',
}

export const basicInfoApiConfig: BasicInfoApi = {
  defaultPicByGender: apiPrefix + '/jobapplicant/defaultPic',
  updateEmployeeDetails: apiPrefix + '/jobapplicant/updateEmployeeDetails',
}
