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

export interface EmployeeGeneralInformationApi extends ApiBase {
  getLoggedInEmployeeData: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
}
export interface EmployeeSkillList extends ApiBase {
  getEmployeeSkillsList: string
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

export interface QualificationsApi extends ApiBase {
  employeeQualifications: string
  getEmployeeSkillsList: string
  getEmployeeCertificatesList: string
}
