import { methods, loggedInEmployeeData } from '../../apiList'
import { GeneralInformationDataModel } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const postGeneralInformation = async (
  employeeId: number,
): Promise<{ generalInformation: GeneralInformationDataModel } | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: loggedInEmployeeData.getLoggedInEmployeeData,
    method: methods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
