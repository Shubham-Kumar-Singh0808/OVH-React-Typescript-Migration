import {
  GetAllAssetResponse,
  SaveEmployee,
} from '../../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { changeAssetStatusConfig, AllowedHttpMethods } from '../../../apiList'

const GetAllAssets = async (): Promise<GetAllAssetResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: changeAssetStatusConfig.getAllAssets,
    method: AllowedHttpMethods.post,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const saveEmployee = async (): Promise<SaveEmployee> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: changeAssetStatusConfig.saveEmployee,
    method: AllowedHttpMethods.put,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const GetAllAssetsListApi = {
  GetAllAssets,
  saveEmployee,
}

export default GetAllAssetsListApi
