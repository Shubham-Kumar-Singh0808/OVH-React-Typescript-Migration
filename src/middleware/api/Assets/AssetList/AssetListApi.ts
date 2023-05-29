import {
  AllAssetListProps,
  AssetTypeChangeList,
  ManufacturerList,
  AllAssetData,
} from '../../../../types/Assets/AssetList/AssetListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, GetAssetListConfig } from '../../apiList'

const getAssetTypeChangeList = async (
  id: number,
): Promise<AssetTypeChangeList[]> => {
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

const getAllLookUpList = async (): Promise<ManufacturerList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAssetListConfig.getAllLookUps,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllAssetListData = async (
  props: AllAssetListProps,
): Promise<AllAssetData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAssetListConfig.getAllAssets,
    method: AllowedHttpMethods.post,
    data: props,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AssetLitApi = {
  getAllLookUpList,
  getAssetTypeChangeList,
  getAllAssetListData,
}
export default AssetLitApi
