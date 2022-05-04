const baseUrl = process.env.REACT_APP_API_BASE || ''
const apiPrefix = baseUrl + '/hrm-ws'

export const methodGet = 'get'
export const methodPost = 'post'
export const methodDelete = 'delete'
export const methodPut = 'put'

export const authenticationLogin = apiPrefix + '/auth/login'
export const authenticationLogout = apiPrefix + '/user/logoutUser'
export const getLoggedInEmployeeData =
  apiPrefix + '/jobapplicant/loggedInEmployee'
export const getFamilyDetails = apiPrefix + '/Employee/familyInformation'
export const getEmployeeSkillsList =
  apiPrefix + '/jobapplicant/getEmployeeskillList'
