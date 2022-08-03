import { ValidationError, LoadingState } from '../../../commonTypes'

export type QualificationCategory = {
  id?: number
  qualificationCategory: string
  qualificationName: string
}

export type QualificationCategorySliceState = {
  qualificationCategories: QualificationCategory[]
  currentPage: number
  pageSize: number
  isLoading: LoadingState
  error: ValidationError
}
