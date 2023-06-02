import {
  AssetTypeAddList,
  UpdateAssetListSliceState,
} from '../../../../types/Assets/AssetList/addEditListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, GetAddAssetListConfig } from '../../apiList'

const getAddAssetList = async (
  data: AssetTypeAddList,
): Promise<AssetTypeAddList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAddAssetListConfig.addAsset,
    method: AllowedHttpMethods.get,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const updateAddAsset = async (
  data: UpdateAssetListSliceState,
): Promise<UpdateAssetListSliceState> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAddAssetListConfig.updateAddAsset,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddAssetApi = {
  getAddAssetList,
  updateAddAsset,
}
export default AddAssetApi
