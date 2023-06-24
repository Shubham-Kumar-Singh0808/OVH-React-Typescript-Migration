import {
  AllAssetListProps,
  AssetTypeChangeList,
  AllAssetData,
  AssetHistoryProps,
  AssetProps,
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

const getAssetHistory = async (
  props: AssetProps,
): Promise<AssetHistoryProps[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAssetListConfig.getAssetHistory,
    method: AllowedHttpMethods.get,
    params: {
      assetId: props.assetId,
      searchAssetReference: props.searchAssetReference,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AssetLitApi = {
  getAssetTypeChangeList,
  getAllAssetListData,
  getAssetHistory,
}
export default AssetLitApi
