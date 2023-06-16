import { LoadingState, ValidationError } from '../../commonTypes'

export type EmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export interface RatingOptions {
  value: string
  label: string
}

export type ReviewListData = {
  appraisalFormStatus: string
  cycleId: number
  departmentName: string
  designationName: string
  empStatus: string
  employeeID: string
  endIndex: number
  ratings: []
  role: string
  searchString: string
  startIndex: number
  toDate?: string
  fromDate?: string
}

export type Appraisal = {
  appraisalFormStatus: null
  cycleStartDate: string
  empAvgRating: number
  empDepartmentName: string
  empDesignationName: string
  empId: number
  employeeName: string
  finalRating: null
  formStatus: string
  formStatusvalue: number
  id: number
  manager1Name: string
  overallAvgRating: number | string
  pendingWith: string
}

export type ReviewListResponse = {
  list: Appraisal[]
  size: number
}

export type ReviewListApiProps = {
  activecycleId: number
  empStatus: string
  departmentName: string
  designationName: string
  appraisalFormStatus: string
  status: string
  search: string
  ratings: string
  fromDate: null | string
  toDate: null | string
  token?: string
}

export type AppraisalCycle = {
  id: number
  name: string
  description: string
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}

export type Designation = {
  id: number
  name: string
  code: string
  departmentName: string
  departmentId: number
}

export type ReviewListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  filterByDepartment: string
  filterByDesignation: string
  isTableView: boolean
}

export type ActiveCycle = {
  id: number
  name: string
  description: null
  toDate: string
  fromDate: string
  active: boolean
  appraisalType: string
  appraisalDuration: string
  level: number
  cycleStartedFlag: boolean
  appraisalStartDate: string
  appraisalEndDate: string
  servicePeriod: number
}

export type ReviewListSliceState = {
  employeeDepartments: EmpDepartments[]
  appraisalCycle: AppraisalCycle[]
  appraisal: Appraisal[]
  designations: Designation[]
  employeeReviewList: ReviewListResponse
  listSize: number
  activeCycle: ActiveCycle
  isLoading: LoadingState
  error: ValidationError
}

export type GetSearchResultProps = {
  appraisalFormStatus: string
  cycleId: number
  departmentName: string
  designationName: string
  empStatus: string
  employeeID: number
  endIndex: number
  fromDate: null
  ratings: []
  role: string
  searchString: string
  startIndex: number
  toDate: null
}

export type Ratings = [
  {
    value: number
    text: string
  },
]
