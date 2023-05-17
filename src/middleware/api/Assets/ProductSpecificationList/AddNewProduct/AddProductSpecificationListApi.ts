import {
  GetAssetTypeListDetails,
  GetProductTypeListDetails,
} from '../../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ProductSpecificationListReportApiConfig,
} from '../../../apiList'

const getAssetTypeList = async (
  id: number,
): Promise<GetAssetTypeListDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getassetTypeChangeList,
    method: AllowedHttpMethods.get,
    params: { id },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getProductTypeList = async (
  productId: number,
): Promise<GetProductTypeListDetails> => {
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
}
export default assetTypeListApi
