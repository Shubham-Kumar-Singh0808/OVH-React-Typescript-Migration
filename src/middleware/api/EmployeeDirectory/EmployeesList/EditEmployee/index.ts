import axios from 'axios'
import { EditEmployeeTypes } from '../../../../../types/EmployeeDirectory/EmployeesList/EditEmployee'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'
import {
  employeeGeneralInformationApiConfig,
  AllowedHttpMethods,
} from '../../../apiList'

const getEmployeeGeneralInformation = async (
  employeeId: string,
): Promise<EditEmployeeTypes> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeGeneralInformationApiConfig.getLoggedInEmployeeData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeGeneralInformationApi = {
  getEmployeeGeneralInformation,
}
export default employeeGeneralInformationApi
