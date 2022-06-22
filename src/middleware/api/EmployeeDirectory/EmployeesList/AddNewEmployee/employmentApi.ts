import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'

import { GetAllEmployment } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmploymentTypes = async (): Promise<GetAllEmployment[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllemploymentType,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getEmploymentsApi = {
  getEmploymentTypes,
}

export default getEmploymentsApi
