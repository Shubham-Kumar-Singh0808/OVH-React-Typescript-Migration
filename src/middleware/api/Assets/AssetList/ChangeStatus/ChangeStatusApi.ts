import { GetAllAssetResponse } from '../../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
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
const GetAllAssetsListApi = {
  GetAllAssets,
}

export default GetAllAssetsListApi
