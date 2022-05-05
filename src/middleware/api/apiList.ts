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

export const categoriesApi: ApiObjectType = {
  getAllCategories: apiPrefix + '/jobapplicant/getAllCategories',
  addCategory: apiPrefix + '/jobapplicant/addCategory',
  deleteCategory: apiPrefix + '/jobapplicant/deleteCategory',
}
export const personalInfoApi: ApiObjectType = {
  getFamilyDetails: apiPrefix + '/Employee/familyInformation',
  getVisaDetails: apiPrefix + '/Employee/getEmployeeVisaDetailsList',
}
