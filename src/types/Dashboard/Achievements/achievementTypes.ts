import { LoadingState, ValidationError } from '../../commonTypes'

export type ServiceAward = {
  achievementType: string
  achievementTypeId: number
  createdBy: null
  createdDate: null
  croppedImageData: null
  dateRequired: boolean
  description: null
  employeeId: number
  employeeName: string
  endDate: null
  id: number
  profilePicture: string
  showOnDashBoard: boolean
  startDate: null
  thumbPicture: string
  timePeriod: string
  timePeriodRequired: boolean
  updatedBy: null
  updatedDate: null
}

export type AchievementsSliceState = {
  serviceAwards: ServiceAward[]
  isLoading: LoadingState
  error: ValidationError
}
