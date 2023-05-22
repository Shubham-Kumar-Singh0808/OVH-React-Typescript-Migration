import {
  AddBtnProducts,
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

const getProductTypeList = async (
  productId: number,
): Promise<ProductType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getProductTypeChangeList,
    method: AllowedHttpMethods.get,
    params: { productId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const addProductSpecifications = async (
  data: AddBtnProducts,
): Promise<AddBtnProducts> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.addProductSpecifications,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const assetTypeListApi = {
  getAssetTypeList,
  getProductTypeList,
  getAllLookUpList,
  addProductSpecifications,
}
export default assetTypeListApi
