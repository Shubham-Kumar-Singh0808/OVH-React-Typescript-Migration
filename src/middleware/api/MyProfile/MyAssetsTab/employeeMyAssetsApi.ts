import { employeeMyAssetsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeMyAssets } from '../../../../types/MyProfile/MyAssetsTab/myAssetsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeMyAssets = async (
  employeeId: number | string,
): Promise<EmployeeMyAssets[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeMyAssetsApiConfig.getEmployeeAssets,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const employeeMyAssetsApi = {
  getEmployeeMyAssets,
}
export default employeeMyAssetsApi
