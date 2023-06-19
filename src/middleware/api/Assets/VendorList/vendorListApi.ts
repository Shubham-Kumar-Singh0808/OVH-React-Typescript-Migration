import {
  GetAllVendorDetails,
  VendorDetails,
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

const updateVendorDetails = async (
  data: VendorDetails,
): Promise<VendorDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.editVendorDetails,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteVendorDetails = async (vendorId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.deleteVendorDetails,
    method: AllowedHttpMethods.delete,
    params: {
      vendorId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const vendorListApi = {
  getVendors,
  exportVendorListData,
  updateVendorDetails,
  deleteVendorDetails,
}

export default vendorListApi
