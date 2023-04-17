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
  getWorkDetails: GetWorkDetails
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
  billable?: string
  comments?: null
  count?: null
  desigination?: string
  empName?: string
  employeeId: number
  endDate?: string
  holidays: string
  hours: string
  leaves: string
  monthWorkingDays: string
  role?: string
  startDate?: string
  totalDays: string
  totalValue: string
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

export type GetWorkDetailsProps = {
  empId: number
  fromdate: string
  todate: string
}

export type GetWorkDetails = {
  totalValue: number
  Leaves: string
  hours: string
  holidays: number
  totalDays: string
  workingDays: string
  employeeId: number
}
export type AddMilestoneProps = {
  actualDate: string
  billable: string
  comments: string
  crId: number
  milestoneNumber: string
  milestonePercentage?: string
  milestoneTypeFlag?: string
  planedDate: string
  projectId: number
  title: string
  allocatedMilestonePeople?: GetPeopleForMilestone[]
}
