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

export type ProjectScheduleVarianceState = {
  projectScheduleVariance: ProjectScheduleVariance[]
  isLoading: LoadingState
}
