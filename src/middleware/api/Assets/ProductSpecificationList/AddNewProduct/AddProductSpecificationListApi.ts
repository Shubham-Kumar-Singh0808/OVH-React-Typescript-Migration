import {
  AddProductSpecificationProps,
  AssetType,
  ManufacturerList,
  ProductType,
  UpdateProductSpecificationTypes,
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

const deleteProductSpecification = async (
  specificationId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.deleteProductSpecification,
    method: AllowedHttpMethods.delete,
    params: {
      specificationId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addProductSpecifications = async (
  addProductSpecifications: AddProductSpecificationProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.addProductSpecifications,
    method: AllowedHttpMethods.post,
    data: addProductSpecifications,
  })
  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}
const updateProductSpecification = async (
  productSpecificationDetails: UpdateProductSpecificationTypes,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.updateProductSpecification,
    method: AllowedHttpMethods.put,
    data: productSpecificationDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const assetTypeListApi = {
  getAssetTypeList,
  getProductTypeList,
  getAllLookUpList,
  deleteProductSpecification,
  addProductSpecifications,
  updateProductSpecification,
}
export default assetTypeListApi
