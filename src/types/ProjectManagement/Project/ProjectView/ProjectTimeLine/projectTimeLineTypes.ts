export type ProjectHistoryResponse = {
  size: number
  list: ProjectHistory[]
}

export type ProjectHistory = {
  id: null
  projectName: null
  oldProjectName: null
  startdate: null
  oldStartDate: null
  enddate: null
  description: null
  oldDescription: null
  status: null
  oldStatus: null
  managerName: null
  oldManagerName: null
  count: null
  allocation: null
  oldAllocation: null
  isAllocated: null
  oldIsAllocated: null
  employeeId: null
  health: null
  oldHealth: null
  client: null
  oldClient: null
  type: null
  oldType: null
  fromDate: null
  oldFromDate: null
  toDate: null
  oldToDate: null
  commnets: null
  oldComments: null
  billable: true
  oldBillable: false
  modifiedDate: string
  modifiedBy: string
  persistType: string
  projectDetailsFlag: null
  employeeName: null
  oldEmployeeName: null
  columnName: null
  oldvalue: null
  newValue: null
  additionalInfo: string
  allocatedEmpNames: null
  oldEndDate: null
}
