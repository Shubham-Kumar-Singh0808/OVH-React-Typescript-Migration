import axios from 'axios'
import { Handbook } from '../../../types/EmployeeHandbook/employeeHandbookTypes'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'
import { AllowedHttpMethods, dispHandbook } from '../apiList'

const showHandbook = async (passedName: string): Promise<Handbook> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dispHandbook.dispHandbook,
    method: AllowedHttpMethods.get,
    params: { pageName: passedName },
  })

  const response = await axios(requestConfig)
  return response.data
}

const dispHandbookApi = {
  showHandbook,
}

export default dispHandbookApi
