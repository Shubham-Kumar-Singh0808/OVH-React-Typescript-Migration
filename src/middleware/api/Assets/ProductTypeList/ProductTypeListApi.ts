import {
  ProductTypeListProps,
  exportProductListDownload,
  ProductTypeListResponse,
} from '../../../../types/Assets/ProductTypeList/ProductTypeListTypes'
import {
  AddProductTypes,
  ManufacturerList,
  UpdateProductTypeRecordTypes,
} from '../../../../types/Assets/ProductTypeList/addproducttype/AddProductType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, GetProductTypeListConfig } from '../../apiList'

const GetProductTypeList = async (
  props: ProductTypeListProps,
): Promise<ProductTypeListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.getProductTypeList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex,
      productName: props.productName,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const DeleteProductTypeRecord = async (productId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.deleteProduct,
    method: AllowedHttpMethods.delete,
    params: {
      productId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const ExportProductListDownloading = async (
  props: exportProductListDownload,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.exportProductList,
    method: AllowedHttpMethods.get,
    params: {
      productSearch: props.productSearch,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllLookUpsApi = async (): Promise<ManufacturerList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.getAllLookUps,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddProductTypeRecord = async (
  props: AddProductTypes,
): Promise<string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.addProduct,
    method: AllowedHttpMethods.post,
    data: props,
  })
  const response = await useAxios(requestConfig)
  return response.data
}
const UpdateProductTypeRecord = async (
  props: UpdateProductTypeRecordTypes,
): Promise<string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: GetProductTypeListConfig.updateProduct,
    method: AllowedHttpMethods.put,
    data: props,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const ProductTypeListApi = {
  GetProductTypeList,
  DeleteProductTypeRecord,
  ExportProductListDownloading,
  getAllLookUpsApi,
  AddProductTypeRecord,
  UpdateProductTypeRecord,
}

export default ProductTypeListApi
