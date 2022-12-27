import { IncomingActiveEmployee } from '../../Achievements/AddAchiever/AddAchieverTypes'
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

export interface IncomingPerformanceRating {
  id: number
  label: null | string
  rating: number
}

export interface AddObservationInitialState {
  isLoading: LoadingState
  ratingScaleRender: IncomingRatingScalePage
  performanceRating: IncomingPerformanceRating[]
  error: ValidationError
  activeEmployeeList: IncomingActiveEmployee[]
}
