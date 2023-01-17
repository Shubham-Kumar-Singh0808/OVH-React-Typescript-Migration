import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type MileStonesList = {
  size: number
  list: MileStoneResponse[]
}

export type AllocatedMilestonePeople = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: number
  startDate: string
  endDate: string
  billable: boolean
  comments: null
  department: string
  desigination: string
  userName: string
  isAllocated: boolean
  duration: null
  count: null
  rate: null
  role: string
  amount: null
  empName: null
  status: null
  monthWorkingDays: string
  holidays: string
  leaves: string
  totalDays: string
  hours: string
  totalValue: string
  allocation: string
}

export type MileStoneResponse = {
  id: number
  title: string
  milestoneNumber: string
  planedDate: string
  actualDate: string
  billable: boolean
  comments: string
  project: string
  client: string
  projectId: null
  isClosed: true
  milestonePercentage: string
  milestonePeopleDTO: null
  allocatedMilestonePeople: AllocatedMilestonePeople[]
  crId: null
  crName: null
  crDuration: null
  invoiceStatus: true
  projectType: string
  effort: null
  invoiceReopenFlag: false
  enableReopenFlag: true
  invoiceExits: null
  milestoneTypeFlag: null
  milestoneAmount: null
  raisedInvoicePercentage: null
  remainingPercentage: null
}

export type MileStoneSliceState = {
  mileStonesList: MileStonesList
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}
