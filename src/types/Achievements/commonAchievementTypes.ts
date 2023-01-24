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

export interface CommonAchievementInitialState {
  achievementTypeList: IncomingAchievementTypes
  isLoading: LoadingState
  currentPage: number
  pageSize: number
  listSize: number
}

export interface NomineeCycleType {
  id: number
  cycleName: string
  fromMonth: string
  toMonth: string
  activateFlag: boolean
  startDate: string
  endDate: string
  questionMappingDtos: null
}

export interface NomineeCycleListType {
  size: number
  list: NomineeCycleType[]
}
