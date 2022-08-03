import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetAllJobType } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getJobTypes = async (): Promise<GetAllJobType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllJobType,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getJobTypesApi = {
  getJobTypes,
}

export default getJobTypesApi
