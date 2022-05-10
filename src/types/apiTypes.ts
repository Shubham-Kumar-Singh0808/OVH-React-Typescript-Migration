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

export interface QualificationsApi extends ApiBase {
  getEmployeeQualifications: string
  getEmployeeSkillsList: string
  getEmployeeCertificatesList: string
  getPostGraduationAndGraduationList: string
  addEmployeeQualifications: string
  updateEmployeeQualifications: string
}
