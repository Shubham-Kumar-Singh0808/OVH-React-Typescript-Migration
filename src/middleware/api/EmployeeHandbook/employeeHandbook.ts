import { AllowedHttpMethods, employeeHandbook } from '../apiList'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'
import { Handbook } from '../../../types/EmployeeHandbook/employeeHandbookTypes'

const getHandbooks = async (): Promise<Handbook[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeHandbook.getHandbooks,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeHandbookApi = {
  getHandbooks,
}

export default employeeHandbookApi
