import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'

import { GetCountries } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getCountries = async (): Promise<GetCountries[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getEmpCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getCountriesApi = {
  getCountries,
}

export default getCountriesApi
