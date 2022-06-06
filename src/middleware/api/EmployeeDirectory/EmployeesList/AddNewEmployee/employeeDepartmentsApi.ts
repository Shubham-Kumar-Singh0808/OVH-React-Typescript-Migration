import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'

import { EmployeeDepartment } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmployeeDepartments = async (): Promise<EmployeeDepartment[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getEmployeeDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeDepartmentsApi = {
  getEmployeeDepartments,
}

export default getEmployeeDepartmentsApi
