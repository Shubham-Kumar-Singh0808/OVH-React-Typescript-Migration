import {
  AssetType,
  ManufacturerList,
  ProductType,
} from '../../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ProductSpecificationListReportApiConfig,
} from '../../../apiList'

const getAssetTypeList = async (id: number): Promise<AssetType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getassetTypeChangeList,
    method: AllowedHttpMethods.get,
    params: { id },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllLookUpList = async (): Promise<ManufacturerList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getAllLookUps,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProductTypeList = async (productId: number): Promise<AssetType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getProductTypeChangeList,
    method: AllowedHttpMethods.get,
    params: { productId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const assetTypeListApi = {
  getAssetTypeList,
  getProductTypeList,
  getAllLookUpList,
}
export default assetTypeListApi
