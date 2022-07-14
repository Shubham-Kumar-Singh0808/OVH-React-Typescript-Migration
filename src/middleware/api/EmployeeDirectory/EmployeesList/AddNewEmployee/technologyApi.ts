import {
  AllowedHttpMethods,
  employeeCertificationsApiConfig,
} from '../../../apiList'
import { GetAllTechnology } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getAllTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeCertificationsApiConfig.getTechnologies,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllTechnologyApi = {
  getAllTechnology,
}

export default getAllTechnologyApi
