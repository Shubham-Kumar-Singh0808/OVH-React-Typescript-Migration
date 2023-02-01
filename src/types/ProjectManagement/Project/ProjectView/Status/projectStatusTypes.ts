import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type ProjectStatusReport = {
  id: number
  prevstatus: string
  prevDate: string
  nextstatus: string
  nextDate: string
  addOn: null
  projectId: number | string
}

export type StatusReportList = {
  size: number
  list: ProjectStatusReport[]
}

export type StatusReportListSliceState = {
  statusReportList: StatusReportList
  projectStatusReport: ProjectStatusReport[]
  isLoading: ApiLoadingState
}

export type StatusReportListProps = {
  endIndex: number
  firstIndex: number
  projectId: string | number
}

export type AddProjectStatusReportProps = {
  nextDate: string
  nextstatus: string
  prevDate: string
  prevstatus: string
  projectId: string
}
export type UpdateProjectStatusReportProps = {
  addOn: null
  id: number
  nextDate: string
  nextstatus: string
  prevDate: string
  prevstatus: string
  projectId: string | number
}
