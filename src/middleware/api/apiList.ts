import {
  AuthenticationApi,
  CategoryApi,
  QualificationCategoryApi,
  SkillApi,
} from '../../types/apiTypes'

const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws'

export enum AllowedHttpMethods {
  get = 'get',
  post = 'post',
  update = 'update',
  delete = 'delete',
}

export const authenticationApi: AuthenticationApi = {
  login: apiPrefix + '/auth/login',
  logout: apiPrefix + '/user/logoutUser',
}

export const categoriesApi: CategoryApi = {
  getAllCategories: apiPrefix + '/jobapplicant/getAllCategories',
  addCategory: apiPrefix + '/jobapplicant/addCategory',
  deleteCategory: apiPrefix + '/jobapplicant/deleteCategory',
}

export const skillsApi: SkillApi = {
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
