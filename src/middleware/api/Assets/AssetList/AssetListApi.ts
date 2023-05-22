import {
  AssetTypeChangeListApiProps,
  GetAllLookUpList,
  GetAssetTypeChangeListDetails,
} from '../../../../types/Assets/AssetList/AssetListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, GetAssetListConfig } from '../../apiList'

const getAssetTypeChangeList = async (
  id: number,
): Promise<GetAssetTypeChangeListDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAssetListConfig.getAssetTypeChange,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllLookUpList = async (): Promise<GetAllLookUpList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAssetListConfig.getAllLookUps,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AssetLitApi = {
  getAllLookUpList,
  getAssetTypeChangeList,
}
export default AssetLitApi
