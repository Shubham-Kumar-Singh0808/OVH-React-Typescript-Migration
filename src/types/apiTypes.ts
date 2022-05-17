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

export interface SkillApi extends ApiBase {
  getSkillListForCategory: string
  addNewSkillForCategory: string
  deleteSkillForCategory: string
}

export interface QualificationCategoryApi extends ApiBase {
  getAllQualificationCategories: string
  addNewQualificationCategory: string
  deleteQualificationCategory: string
}
export interface EmployeeGeneralInformationApi extends ApiBase {
  getLoggedInEmployeeData: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
}
export interface QualificationsApi extends ApiBase {
  getEmployeeQualifications: string
  getEmployeeSkillsList: string
  getEmployeeCertificatesList: string
  getPostGraduationAndGraduationList: string
  addEmployeeQualifications: string
  updateEmployeeQualifications: string
  getAllTechnologyList: string
  getCertificateByTechnology: string
  addEmployeeCertificates: string
  getEmployeeCertificate: string
  updateEmployeeCertificate: string
}
export interface UserRolesConfigurationApi extends ApiBase {
  getUserRoles: string
  isUserRoleExists: string
  addNewUserRole: string
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
}
