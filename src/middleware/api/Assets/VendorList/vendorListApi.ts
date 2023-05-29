import {
  GetAllVendorDetails,
  VendorListApiProps,
} from '../../../../types/Assets/VendorList/vendorListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, vendorListApiConfig } from '../../apiList'

const getVendors = async (
  props: VendorListApiProps,
): Promise<GetAllVendorDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.getAllVendorDetails,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      vendorName: props.vendorName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportVendorListData = async (
  props: VendorListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.exportVendorData,
    method: AllowedHttpMethods.get,
    params: {
      vendorNameSearch: props.vendorNameSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const vendorListApi = {
  getVendors,
  exportVendorListData,
}

export default vendorListApi
