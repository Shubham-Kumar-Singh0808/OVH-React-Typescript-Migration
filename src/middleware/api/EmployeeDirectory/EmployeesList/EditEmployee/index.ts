import { EditEmployeeTypes } from '../../../../../types/EmployeeDirectory/EmployeesList/EditEmployee'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  employeeGeneralInformationApiConfig,
  addNewEmployeeAPiConfig,
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
  const response = await useAxios(requestConfig)
  return response.data
}

const updateEmployeeDetails = async (
  employeeDetails: EditEmployeeTypes,
): Promise<EditEmployeeTypes> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.editEmployee,
    method: AllowedHttpMethods.post,
    data: employeeDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeGeneralInformationApi = {
  getEmployeeGeneralInformation,
  updateEmployeeDetails,
}
export default employeeGeneralInformationApi
