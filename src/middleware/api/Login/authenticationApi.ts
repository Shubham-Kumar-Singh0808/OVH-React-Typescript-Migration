import { authenticationLogin, methodGet } from '../apiList'

import { UserDataType } from '../../../types/Login/authenticationTypes'
import axios from 'axios'
import { encode } from 'base-64'
import { getUnauthenticatedRequestConfig } from '../../../utils/apiUtils'

export const postLoginUser = async ({
  username,
  password,
  tenantKey,
}: {
  username: string
  password: string
  tenantKey: string
}): Promise<UserDataType | undefined> => {
  const encodedCredentials = encode(`${username}:${password}`)

  const requestConfig = getUnauthenticatedRequestConfig({
    url: authenticationLogin,
    method: methodGet,
    additionalHeaders: {
      Authorization: `Basic ${encodedCredentials}`,
    },
    tenantKey,
  })

  let userCredentials: UserDataType = {
    employeeName: '',
    employeeId: '',
    userName: '',
    role: '',
    tenantKey: '',
    token: '',
    designation: '',
  }

  const response = await axios(requestConfig)

  if (response.status === 200) {
    const employeeName = `${response.data.employeeDto.firstName} ${response.data.employeeDto.lastName}`
    const employeeId = response.data.employeeDto.id
    const userName = response.data.employeeDto.userName
    const role = response.data.employeeDto.role
    const tenantKeyFromResponse = response.data.tenantKey
    const token = response.data.employeeDto.token
    const designation = response.data.employeeDto.designation

    localStorage.setItem('employeeName', employeeName)
    localStorage.setItem('employeeId', employeeId)
    localStorage.setItem('userName', userName)
    localStorage.setItem('role', role)
    localStorage.setItem('tenantKey', tenantKeyFromResponse)
    localStorage.setItem('token', token)
    localStorage.setItem('designation', designation)

    userCredentials = {
      employeeName,
      employeeId,
      userName,
      role,
      tenantKey,
      token,
      designation,
    }

    console.log(userCredentials)

    return userCredentials
  }
}
