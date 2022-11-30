import { AllowedHttpMethods, employeeProfileApiConfig } from '../../apiList'
import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getEmployeeViewProfile = async (
  employeeId: string,
): Promise<{ generalInformation: EmployeeGeneralInformation } | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProfileApiConfig.loggedInEmployeeData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeProfileViewInformationApi = {
  getEmployeeViewProfile,
}
export default employeeProfileViewInformationApi
