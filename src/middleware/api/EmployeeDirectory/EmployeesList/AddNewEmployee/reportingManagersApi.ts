import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'

import { GetAllReportingManagers } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getAllReportingManagers = async (): Promise<
  GetAllReportingManagers[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllReportingManagersData,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const reportingManagersApi = {
  getAllReportingManagers,
}

export default reportingManagersApi
