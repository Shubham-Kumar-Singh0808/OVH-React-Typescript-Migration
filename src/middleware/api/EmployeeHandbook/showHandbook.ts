import axios from 'axios'
import {
  Handbook,
  showHandbookApiProps,
} from '../../../types/EmployeeHandbook/employeeHandbookTypes'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'
import { AllowedHttpMethods, dispHandbook } from '../apiList'

const showHandbook = async (props: showHandbookApiProps): Promise<Handbook> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dispHandbook.dispHandbook,
    method: AllowedHttpMethods.get,
    params: { pageName: props.pageName },
  })

  const response = await axios(requestConfig)
  return response.data
}

const dispHandbookApi = {
  showHandbook,
}

export default dispHandbookApi
