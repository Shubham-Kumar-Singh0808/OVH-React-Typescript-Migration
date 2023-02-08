import { LoadingState } from '../../../../commonTypes'

export type ProjectScheduleVariance = {
  versionName: string
  actuallEffort: number
  plannedEffort: null
  actualStartDate: string
  actualEndDate: string
  baseLineStartDate: string
  baseLineEndDate: string
  sheduleVariance: number
  percentageOfCompletion: null
  status: string
  projectedStartDate: string
  projectedEndDate: string
  id: null
}

export type ProjectOverAllScheduleVariance = {
  id: number
  projectId: null
  baseLineStartDate: string
  baseLineEndDate: string
  actualStartDate: string
  actualEndDate: string
  overAllSheduleVariance: string
  comments: string
  createdBy: null
  employeeName: string
  createdDate: string
  createdTime: string
}

export type ProjectScheduleVarianceState = {
  projectScheduleVariance: ProjectScheduleVariance[]
  projectOverAllScheduleVariance: ProjectOverAllScheduleVariance[]
  isLoading: LoadingState
}
