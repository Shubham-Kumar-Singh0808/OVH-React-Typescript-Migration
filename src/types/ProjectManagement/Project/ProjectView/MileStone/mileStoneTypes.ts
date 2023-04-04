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
  getMilestone: GetMilestone
  getPeopleForMilestone: GetPeopleForMilestone[]
  milestoneNumber: number
  getCRListForMilestone: GetCRListForMilestone[]
}

export type GetMilestone = {
  actualDate: string
  allocatedMilestonePeople: AllocatedMilestonePeople[]
  billable: boolean
  client: null
  comments: string
  crDuration: null
  crId: null
  crName: null
  effort: null
  enableReopenFlag: null
  id: number
  invoiceExits: null
  invoiceReopenFlag: null
  invoiceStatus: boolean
  isClosed: boolean
  milestoneAmount: null
  milestoneNumber: string
  milestonePeopleDTO: null
  milestonePercentage: string
  milestoneTypeFlag: boolean
  planedDate: string
  project: null
  projectId: null
  projectType: null
  raisedInvoicePercentage: null
  remainingPercentage: null
  title: string
}

export type EditInvoiceDetails = {
  title: string
  milestoneNumber: string
  planedDate: string
  actualDate: string
  billable: boolean
  comments: string
}

export type GetPeopleForMilestone = {
  employeeId: number
  empFirstName: null
  empLastName: null
  projectName: null
  projectId: null
  startDate: null
  endDate: null
  billable: true
  comments: null
  department: null
  desigination: string
  userName: string
  isAllocated: true
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  empName: string
  status: null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: null
  totalValue: null
  allocation: string
}

export type GetCRListForMilestone = {
  id: number
  name: string
  descripition: string
  duration: string
  projectId: number
  numbersStatus: boolean
  milestoneStatus: boolean
}
