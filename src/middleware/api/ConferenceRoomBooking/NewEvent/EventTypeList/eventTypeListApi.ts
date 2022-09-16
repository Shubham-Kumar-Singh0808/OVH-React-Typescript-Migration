import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, eventTypeListApiConfig } from '../../../apiList'

const getAllEventTypes = async (): Promise<
  {
    id: number
    name: string
  }[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: eventTypeListApiConfig.getAllEventTypes,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const eventTypeListApi = {
  getAllEventTypes,
}

export default eventTypeListApi
