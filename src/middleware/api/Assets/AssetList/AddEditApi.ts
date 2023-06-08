import {
  AssetTypeAddList,
  UpdateAssetListSliceState,
  typeChangeSpecificationsList,
  typeChangeSpecificationsProps,
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
    method: AllowedHttpMethods.post,
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

const checkAssetNumberExixts = async (
  AssetNumber: number,
): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAddAssetListConfig.checkAssetNumberExixts,
    method: AllowedHttpMethods.get,
    params: {
      AssetNumber,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const typeChangeSpecifications = async (
  props: typeChangeSpecificationsProps,
): Promise<typeChangeSpecificationsList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetAddAssetListConfig.typeChangeSpecifications,
    method: AllowedHttpMethods.get,
    params: {
      manufacturerId: props.manufacturerId,
      productId: props.productId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const AddAssetApi = {
  getAddAssetList,
  updateAddAsset,
  checkAssetNumberExixts,
  typeChangeSpecifications,
}
export default AddAssetApi
