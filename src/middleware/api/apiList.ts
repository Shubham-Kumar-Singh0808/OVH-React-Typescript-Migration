import { ApiMethodsType, ApiObjectType } from '../../types/commonTypes'

const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws'

export const methodGet = 'get'
export const methodPost = 'post'
export const methodDelete = 'delete'
export const methodPut = 'put'

export const methods: ApiMethodsType = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put',
}

export const authenticationApi: ApiObjectType = {
  login: apiPrefix + '/auth/login',
  logout: apiPrefix + '/user/logoutUser',
}
export const loggedInEmployeeData: ApiObjectType = {
  getLoggedInEmployeeData: apiPrefix + '/jobapplicant/loggedInEmployee',
}
export const employeeFamilyDetails: ApiObjectType = {
  getFamilyDetails: apiPrefix + '/Employee/familyInformation',
}
export const employeeSkillList: ApiObjectType = {
  getEmployeeSkillsList: apiPrefix + '/jobapplicant/getEmployeeskillList',
}
export const categoriesApi: ApiObjectType = {
  getAllCategories: apiPrefix + '/jobapplicant/getAllCategories',
  addCategory: apiPrefix + '/jobapplicant/addCategory',
  deleteCategory: apiPrefix + '/jobapplicant/deleteCategory',
}

export const skillsApi: ApiObjectType = {
  getSkillListForCategory: apiPrefix + '/jobapplicant/getCategorySkill',
  addNewSkillForCategory:
    apiPrefix + '/jobapplicant/addSkillToSpecificCategory',
  deleteSkillForCategory: apiPrefix + '/jobapplicant/deleteSkill',
}
