import { apiMethodsType, apiObjectType } from '../../types/commonTypes'

const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws'

export const methodGet = 'get'
export const methodPost = 'post'
export const methodDelete = 'delete'
export const methodPut = 'put'

export const methods: apiMethodsType = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put',
}

export const authenticationApi: apiObjectType = {
  login: apiPrefix + '/auth/login',
  logout: apiPrefix + '/user/logoutUser',
}
