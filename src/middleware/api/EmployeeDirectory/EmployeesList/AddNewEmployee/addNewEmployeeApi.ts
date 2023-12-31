import { AllowedHttpMethods, addNewEmployeeAPiConfig } from '../../../apiList'
import { AddEmployee } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'

const addNewEmployee = async (
  addEmployee: AddEmployee,
): Promise<AddEmployee> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addNewEmployeeAPiConfig.addNewEmployee,
    method: AllowedHttpMethods.post,
    data: addEmployee,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewEmployeeApi = {
  addNewEmployee,
}
export default addNewEmployeeApi
