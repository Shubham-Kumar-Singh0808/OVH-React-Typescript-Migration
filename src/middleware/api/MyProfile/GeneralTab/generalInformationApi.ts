import {
  AllowedHttpMethods,
  employeeGeneralInformationApi,
} from '../../apiList'

import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import moment from 'moment'

export const getEmployeeGeneralInformationApi = async (
  employeeId: string,
): Promise<{ generalInformation: EmployeeGeneralInformation } | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeGeneralInformationApi.getLoggedInEmployeeData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return {
    ...response.data,
    ...{
      anniversary: moment(response.data.anniversary).format('DD/MM/YYYY'),
      realBirthday: moment(response.data.realBirthday).format('DD/MM/YYYY'),
    },
  }
}
