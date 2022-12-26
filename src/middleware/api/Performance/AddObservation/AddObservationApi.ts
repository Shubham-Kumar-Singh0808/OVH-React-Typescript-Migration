import { IncomingRatingScalePage } from '../../../../types/Performance/AddObservation/AddObservationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { addObservationApiConfig, AllowedHttpMethods } from '../../apiList'

const getRatingScalePage = async (): Promise<IncomingRatingScalePage> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addObservationApiConfig.getRatingScalePage,
    method: AllowedHttpMethods.get,
    params: {
      pageName: 'reviews',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddObservationApi = {
  getRatingScalePage,
}

export default AddObservationApi
