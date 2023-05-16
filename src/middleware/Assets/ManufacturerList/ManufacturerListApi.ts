import {
  GetAllManufacturerName,
  ManufacturerListProps,
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

const ManufacturerApi = {
  getManufacturerList,
}

export default ManufacturerApi
