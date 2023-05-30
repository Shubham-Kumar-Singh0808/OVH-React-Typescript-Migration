import { GetAllAssetResponse } from '../../../../types/Assets/AssetList/ChangeAssetStatusType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, changeAssetStatusConfig } from '../../apiList'

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
