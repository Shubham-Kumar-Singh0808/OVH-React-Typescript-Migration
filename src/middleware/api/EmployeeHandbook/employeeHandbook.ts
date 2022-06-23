import { AllowedHttpMethods, employeeHandbook } from '../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'
import { GetHandbooksResponse } from '../../../types/EmployeeHandbook/employeeHandbookTypes'

const getHandbooks = async (): Promise<GetHandbooksResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbook.getHandbooks,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  console.log(response.data)
  return response.data
}

const employeeHandbookApi = {
  getHandbooks,
}

export default employeeHandbookApi
