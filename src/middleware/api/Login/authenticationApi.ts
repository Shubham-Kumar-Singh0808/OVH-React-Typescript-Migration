import { authenticationApi, methods } from '../apiList'

import { AuthenticatedUserType } from '../../../types/Login/authenticationTypes'
import axios from 'axios'
import { encode } from 'base-64'
import { getUnauthenticatedRequestConfig } from '../../../utils/apiUtils'

export const postLoginUser = async (
  username: string,
  password: string,
  tenantKey: string,
): Promise<{ authenticatedUser: AuthenticatedUserType } | undefined> => {
  const encodedCredentials = encode(`${username}:${password}`)

  const requestConfig = getUnauthenticatedRequestConfig({
    url: authenticationApi.login,
    method: methods.get,
    additionalHeaders: {
      Authorization: `Basic ${encodedCredentials}`,
    },
    tenantKey,
  })

  const response = await axios(requestConfig)

  if (response.status === 200) {
    const data = {
      authenticatedUser: {
        employeeName: `${response.data.employeeDto.firstName} ${response.data.employeeDto.lastName}`,
        employeeId: response.data.employeeDto.id,
        userName: response.data.employeeDto.userName,
        role: response.data.employeeDto.role,
        tenantKey: response.data.tenantKey,
        token: response.data.employeeDto.token,
        designation: response.data.employeeDto.designation,
      },
    }

    localStorage.setItem('employeeName', data.authenticatedUser.employeeName)
    localStorage.setItem('employeeId', data.authenticatedUser.employeeId)
    localStorage.setItem('userName', data.authenticatedUser.userName)
    localStorage.setItem('role', data.authenticatedUser.role)
    localStorage.setItem('tenantKey', data.authenticatedUser.tenantKey)
    localStorage.setItem('token', data.authenticatedUser.token)
    localStorage.setItem('designation', data.authenticatedUser.designation)

    return data
  }
}
