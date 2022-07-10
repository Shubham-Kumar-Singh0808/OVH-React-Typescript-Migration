import { ApiLoadingState } from '../../../middleware/api/apiList'

export type UserAccessToFeatures = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}

export type UserAccessToFeaturesSliceState = {
  userAccessToFeatures: UserAccessToFeatures[]
  isLoading: ApiLoadingState
}
