import {
  GetProductSpecificationListDetails,
  ProductSpecificationListProps,
} from '../../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ProductSpecificationListReportApiConfig,
} from '../../apiList'

const getProductSpecificationList = async (
  props: ProductSpecificationListProps,
): Promise<GetProductSpecificationListDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.getAllProductSpecifications,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      productName: props.productName ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportProductSpecificationData = async (
  props: ProductSpecificationListProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ProductSpecificationListReportApiConfig.exportProductSpecificationList,
    method: AllowedHttpMethods.get,
    params: {
      specificationSearch: props.specificationSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const productSpecificationListApi = {
  getProductSpecificationList,
  exportProductSpecificationData,
}
export default productSpecificationListApi
