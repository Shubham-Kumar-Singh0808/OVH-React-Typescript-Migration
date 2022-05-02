import {
  methodGet,
  getLoggedInEmployeeData,
} from '../../middleware/api/apiList'
import { GeneralInformationDataModel } from './generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../utils/apiUtils'

export const postGeneralInformation = async (
  employeeId: number,
): Promise<{ generalInformation: GeneralInformationDataModel } | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: getLoggedInEmployeeData,
    method: methodGet,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
