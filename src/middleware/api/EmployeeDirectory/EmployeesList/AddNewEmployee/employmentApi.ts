import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetAllEmployment } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getEmploymentTypes = async (): Promise<GetAllEmployment[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllemploymentType,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getEmploymentsApi = {
  getEmploymentTypes,
}

export default getEmploymentsApi
