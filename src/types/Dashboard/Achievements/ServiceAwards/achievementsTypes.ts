import { LoadingState, ValidationError } from '../../../commonTypes'

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

export type SpecialAward = {
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
  startDate: string
  thumbPicture: string
  timePeriod: string
  timePeriodRequired: boolean
  updatedBy: null
  updatedDate: null
}

export type StarOfTheMonth = {
  achievementType: string
  achievementTypeId: number
  createdBy: null
  createdDate: null
  croppedImageData: null
  dateRequired: boolean
  description: null
  employeeId: number
  employeeName: string
  endDate: string
  id: number
  profilePicture: string
  showOnDashBoard: boolean
  startDate: string
  thumbPicture: string
  timePeriod: string
  timePeriodRequired: boolean
  updatedBy: null
  updatedDate: null
}

export type EmployeeAchievementsApiResponse = {
  serviceAwards?: ServiceAward[]
  specialAwards?: SpecialAward[]
  starOfTheMonth?: StarOfTheMonth[]
}

export type AchievementsSliceState = {
  achievementsData: EmployeeAchievementsApiResponse
  isLoading: LoadingState
  error: ValidationError
}
