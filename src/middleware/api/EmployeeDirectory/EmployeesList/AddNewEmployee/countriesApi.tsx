import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetCountries } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const getCountries = async (): Promise<GetCountries[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getEmpCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getCountriesApi = {
  getCountries,
}

export default getCountriesApi
