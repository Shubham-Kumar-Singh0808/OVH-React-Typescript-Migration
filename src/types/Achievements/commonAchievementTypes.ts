import { LoadingState } from '../commonTypes'

export interface AchievementType {
  id: number
  typeName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string | null
  status: boolean
  order: number
  timeperiodrequired: boolean
  daterequired: boolean
}

export interface IncomingAchievementTypes {
  size: number
  list: AchievementType[]
}

export interface initialCommonAchievementState {
  achievementTypeList: IncomingAchievementTypes
  isLoading: LoadingState
}
