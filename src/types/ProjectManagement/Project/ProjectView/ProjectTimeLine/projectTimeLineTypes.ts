import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type ProjectHistoryResponse = {
  size: number
  list: ProjectHistory[]
}

export type ProjectHistory = {
  id: number
  projectName: string
  oldProjectName: string
  startdate: string
  oldStartDate: string
  enddate: string
  description: string
  oldDescription: string
  status: string
  oldStatus: string
  managerName: string
  oldManagerName: string
  count: string
  allocation: string
  oldAllocation: string
  isAllocated: string
  oldIsAllocated: string
  employeeId: null
  health: string
  oldHealth: string
  client: string
  oldClient: string
  type: string
  oldType: string
  fromDate: string
  oldFromDate: string
  toDate: string
  oldToDate: null
  commnets: string
  oldComments: string
  billable: boolean
  oldBillable: boolean
  modifiedDate: string
  modifiedBy: string
  persistType: string
  projectDetailsFlag: null
  employeeName: string
  oldEmployeeName: string
  columnName: string
  oldvalue: string
  newValue: string
  additionalInfo: string
  allocatedEmpNames: string
  oldEndDate: string
}

export type ProjectHistoryDetailsSliceState = {
  projectHistoryResponse: ProjectHistoryResponse
  isLoading: ApiLoadingState
}
