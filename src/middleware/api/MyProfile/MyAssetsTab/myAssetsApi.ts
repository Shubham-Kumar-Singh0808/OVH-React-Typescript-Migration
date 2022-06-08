import { myAssetsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeMyAssets } from '../../../../types/MyProfile/MyAssetsTab/myAssetsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeMyAssetsDetails = async (
  employeeId: number | string,
): Promise<EmployeeMyAssets[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myAssetsApiConfig.getEmployeeAssets,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const myAssetsTabApi = {
  getEmployeeMyAssetsDetails,
}
export default myAssetsTabApi
