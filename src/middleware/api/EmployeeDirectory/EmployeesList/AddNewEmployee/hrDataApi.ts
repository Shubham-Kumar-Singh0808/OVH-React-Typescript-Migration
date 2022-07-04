import axios from 'axios'
import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { GetHrData } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getAllHrData = async (): Promise<GetHrData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.getAllHrData,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getAllHrDataApi = {
  getAllHrData,
}

export default getAllHrDataApi
