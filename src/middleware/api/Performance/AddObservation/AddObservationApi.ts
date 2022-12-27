import { IncomingActiveEmployee } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import {
  IncomingPerformanceRating,
  IncomingRatingScalePage,
} from '../../../../types/Performance/AddObservation/AddObservationTypes'
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

const getPerformanceRating = async (): Promise<IncomingPerformanceRating[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addObservationApiConfig.getPerformanceRating,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getActiveEmployeeList = async (): Promise<IncomingActiveEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addObservationApiConfig.getActiveEmployeeList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddObservationApi = {
  getRatingScalePage,
  getPerformanceRating,
  getActiveEmployeeList,
}

export default AddObservationApi
