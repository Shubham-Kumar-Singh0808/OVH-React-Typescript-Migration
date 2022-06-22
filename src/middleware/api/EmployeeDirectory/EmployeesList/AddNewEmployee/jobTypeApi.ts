import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'

import { GetAllJobType } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getJobTypes = async (): Promise<GetAllJobType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllJobType,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getJobTypesApi = {
  getJobTypes,
}

export default getJobTypesApi
