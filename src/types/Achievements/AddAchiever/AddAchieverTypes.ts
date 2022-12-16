import { EditedAchievementDetails } from '../../../pages/Achievements/AchievementConstants'
import { LoadingState } from '../../commonTypes'
import { AchievementType } from '../commonAchievementTypes'

export enum NewAchievementStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface OutgoingNewAchievementType {
  typeName: string
  status: string
  order: string
  daterequired: boolean
  timeperiodrequired: boolean
}

export interface AchievementTypeIdQueryParameter {
  typeId: number
}

export interface OutgoingUpdateAchievementType
  extends Omit<AchievementType, 'order'> {
  order: string
}

export interface AddAchieverTypeEntriesProps {
  isAddButtonEnabled: boolean
  setAddButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
  userNewSelectedAchievementType: string
  newAchievementTypeNameHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  newUserSelectedStatus: string
  newAchievementStatusHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedOrder: string
  newSelectedOrderHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedTimeReq: boolean
  newSelectedTimeReqHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedDateReq: boolean
  newSelectedDateReqHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  addButtonHandler: () => Promise<void>
  achievementClearButtonHandler: () => void
}

export interface AddAchieverTypeTableProps {
  executeSaveButtonHandler: (
    incomingData: EditedAchievementDetails,
  ) => Promise<void>
}

export interface AddAchieverInitialState {
  isLoading: LoadingState
  achievementTypeDetails: AchievementType | null
}
