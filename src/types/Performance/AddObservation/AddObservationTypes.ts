import { LoadingState, ValidationError } from '../../commonTypes'

export interface AddObservationTab {
  id: number
  name: string
  label: string
}

export interface IncomingRatingScalePage {
  id: number
  displayOrder: number
  title: string
  description: string
  pageName: string
  departmentName: null
  departmentId: null
  type: string
  sectionId: null
  sectionName: null
  country: null
  handCountry: Array<unknown>
  empCountry: string
}

export interface AddObservationInitialState {
  isLoading: LoadingState
  ratingScaleRender: IncomingRatingScalePage
  error: ValidationError
}
