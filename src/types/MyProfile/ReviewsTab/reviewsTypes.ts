import { ValidationError } from '../../commonTypes'
export type EmployeeReviews = {
  id: number
  empId: number
  employeeName: string
  formStatus: string
  formStatusvalue: number
  appraisalFormStatus: null
  overallAvgRating: number
  finalRating: null
  pendingWith: null
  empDepartmentName: string
  empDesignationName: string
  empAvgRating: number
  manager1Name: string
  cycleStartDate: string
}

export type ReviewsTabState = {
  employeeReviewDetails: EmployeeReviews[]
  isLoading: boolean
  error: ValidationError
}
