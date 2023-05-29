import axios from 'axios'
import {
  AddManufacturerListProps,
  GetAllManufacturerName,
  ManufacturerList,
  ManufacturerListProps,
  UpdateProps,
  exportManufacturerListProps,
} from '../../../../types/Assets/ManufacturerList/ManufacturerType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, ManufacturerApiListConfig } from '../../apiList'

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

const getAllLookUpList = async (): Promise<ManufacturerList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.getAllLookUps,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addManufacturer = async (
  addManufactureList: AddManufacturerListProps,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.addManufacturer,
    method: AllowedHttpMethods.post,
    data: addManufactureList,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteManufacturerName = async (
  manufacturerId: number,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.deleteManufacturerName,
    method: AllowedHttpMethods.delete,
    params: {
      manufacturerId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateManufacturerName = async (
  data: UpdateProps,
): Promise<UpdateProps> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: ManufacturerApiListConfig.updateManufacturerName,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const ManufacturerApi = {
  getManufacturerList,
  exportManufacturerData,
  getAllLookUpList,
  addManufacturer,
  deleteManufacturerName,
  updateManufacturerName,
}

export default ManufacturerApi
