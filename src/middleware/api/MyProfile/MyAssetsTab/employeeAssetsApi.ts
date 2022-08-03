import { employeeAssetsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeAsset } from '../../../../types/MyProfile/MyAssetsTab/employeeAssetsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'

const getEmployeeAssets = async (
  employeeId: number | string,
): Promise<EmployeeAsset[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAssetsApiConfig.getEmployeeAssets,
    method: AllowedHttpMethods.get,
    params: {
      employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const employeeAssetsApi = {
  getEmployeeAssets,
}

export default employeeAssetsApi
