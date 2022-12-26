import { LoadingState, ValidationError } from '../../commonTypes'

export type MyReviewTabList = {
  id: number
  tabName: string
  label: string
}

export type PageDetails = {
  country: null
  departmentId: null
  departmentName: null
  description: string
  displayOrder: number
  empCountry: string
  handCountry: []
  id: number
  pageName: string
  sectionId: null
  sectionName: null
  title: string
  type: string
}

export type MyReviewSliceState = {
  pageDetails: PageDetails
  isLoading: LoadingState
  error: ValidationError
}
