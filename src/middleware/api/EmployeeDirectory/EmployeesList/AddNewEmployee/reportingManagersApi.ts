import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetAllReportingManagers } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getAllReportingManagers = async (): Promise<
  GetAllReportingManagers[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllReportingManagersData,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const reportingManagersApi = {
  getAllReportingManagers,
}

export default reportingManagersApi
