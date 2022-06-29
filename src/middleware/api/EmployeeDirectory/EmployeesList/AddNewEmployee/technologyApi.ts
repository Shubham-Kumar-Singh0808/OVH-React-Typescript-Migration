import axios from 'axios'
import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetAllTechnology } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getAllTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllTechnology,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getAllTechnologyApi = {
  getAllTechnology,
}

export default getAllTechnologyApi
