import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type MileStonesList = {
  size: number
  list: MileStoneResponse[]
}

export type AllocatedMilestonePeople = {
  employeeId: string
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: number
  startDate: string
  endDate: string
  billable: string
  comments: string
  department: string
  desigination: string
  userName: string
  isAllocated: boolean
  duration: string
  count: string
  rate: string
  role: string
  amount: string
  empName: string
  status: string
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

export type GetPeopleForMilestone = {
  billable: string
  comments: string
  count: string
  desigination: string
  empName: string
  employeeId: string
  endDate: string
  holidays: string
  hours: string
  leaves: string
  monthWorkingDays: string
  role: string
  startDate: string
  totalDays: string
  totalValue: string
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
  billable: string
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
  totalValue: string
  Leaves: string
  hours: string
  holidays: string
  totalDays: string
  workingDays: string
  employeeId: string
}
export type AddMilestoneProps = {
  actualDate: string
  billable: string
  comments: string
  crId?: number
  milestoneNumber: string
  milestonePercentage?: string
  milestoneTypeFlag?: string
  planedDate: string
  projectId: number
  title: string
  allocatedMilestonePeople?: GetPeopleForMilestone[]
}

export type updateMilestoneProps = {
  actualDate: string
  allocatedMilestonePeople: AllocatedMilestonePeople[]
  billable: string
  client: string | null
  comments: string
  crDuration: string | null
  crId: number
  crName: string | null
  effort: string | null
  enableReopenFlag: string | null
  id: number
  invoiceExits: string | null
  invoiceReopenFlag: string | null
  invoiceStatus: string | boolean
  isClosed: string | boolean
  milestoneAmount: null
  milestoneNumber: string
  milestonePeopleDTO: string | null
  milestonePercentage: string
  milestoneTypeFlag: boolean
  planedDate: string
  project: null
  projectId: string | null
  projectType: null
  raisedInvoicePercentage: null
  remainingPercentage: null
  title: string
}
