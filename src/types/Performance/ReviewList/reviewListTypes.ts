import { LoadingState, ValidationError } from '../../commonTypes'

export type EmpDepartments = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type ReviewListData = {
  appraisalFormStatus: string
  cycleId: number
  departmentName: string
  designationName: string
  empStatus: string
  employeeID: number
  endIndex: number
  ratings: []
  role: string
  searchString: string
  startIndex: number
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
  overallAvgRating: number
  pendingWith: null
}

export type ReviewListResponse = {
  list: Appraisal[]
  size: number
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

export type ReviewListSliceState = {
  employeeDepartments: EmpDepartments[]
  appraisalCycle: AppraisalCycle[]
  appraisal: Appraisal[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
