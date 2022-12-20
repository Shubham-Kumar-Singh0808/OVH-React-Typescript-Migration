import { LoadingState } from '../../../commonTypes'

export type ProjectViewDetails = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: 317
  startDate: string
  endDate: string
  comments: string
  department: string
  desigination: string
  userName: boolean
  isAllocated: true
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  empName: null
  status: null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: null
  totalValue: null
  allocation: string
}

export type ProjectViewDetailsState = {
  projectViewDetails: ProjectViewDetails[]
  isLoading: LoadingState
}
