import axios from 'axios'
import {
  GetAllManufacturerName,
  ManufacturerListProps,
  exportManufacturerListProps,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import {
  AllowedHttpMethods,
  ManufacturerApiListConfig,
} from '../../api/apiList'

const getManufacturerList = async (
  props: ManufacturerListProps,
): Promise<GetAllManufacturerName> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.getAllManufacturerName,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      manufacturerName: props.manufacturerName ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const exportManufacturerData = async (
  props: exportManufacturerListProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.exportManufacturerList,
    method: AllowedHttpMethods.get,
    params: {
      manufacturerNameSearch: props.manufacturerNameSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })
  const response = await axios(requestConfig)
  return response.data
}
const ManufacturerApi = {
  getManufacturerList,
  exportManufacturerData,
}

export default ManufacturerApi
