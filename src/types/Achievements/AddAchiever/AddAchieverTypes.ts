import { EditedAchievementDetails } from '../../../pages/Achievements/AchievementConstants'
import { LoadingState, ValidationError } from '../../commonTypes'
import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { AchievementType } from '../commonAchievementTypes'

export enum NewAchievementStatus {
  Active = 'Active',
  Inactive = 'Inactive',
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

export interface OutgoingNewAchiever {
  achievementTypeId: number
  croppedImageData: string
  employeeId: number
  endDate: string
  startDate: string
  timePeriod: string
  description: string
}

export interface NewAchieverInformation
  extends Omit<
    OutgoingNewAchiever,
    'achievementTypeId' | 'employeeId' | 'description' | 'croppedImageData'
  > {
  achievementName: string
  employeeName: string
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

export interface AddAchieverFormProps {
  addAchievementTypeButtonHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void
  newAchieverDetails: NewAchieverInformation
  setNewAchieverDetails: React.Dispatch<
    React.SetStateAction<NewAchieverInformation>
  >
  isAddButtonEnabled: boolean
  setAddButton: React.Dispatch<React.SetStateAction<boolean>>
  clearInfoButtonHandler: () => void
  addButtonHandler: (finalData: OutgoingNewAchiever) => Promise<void>
  userAccessToAddAchiever: UserAccessToFeatures | undefined
}

export interface AddAchieverTypeTableProps {
  executeSaveButtonHandler: (
    incomingData: EditedAchievementDetails,
  ) => Promise<void>
  isEditSaveButtonEnabled: boolean
  setEditSaveButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IncomingActiveEmployee {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: null
  projectId: null
  startDate: null
  endDate: null
  billable: false
  comments: null
  department: null
  desigination: null
  userName: null
  isAllocated: null
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
  allocation: null
}

export interface IncomingEmployeeImageData {
  id: number
  imageData: string
}

export type AchieverImageCrop = {
  file: string | undefined
  empId: number
  imageBase: string | undefined
  onUploadImage: (croppedImageData: string | undefined) => void
  setimageBase: React.Dispatch<React.SetStateAction<string | undefined>>
}

export interface AddAchieverInitialState {
  isLoading: LoadingState
  achievementTypeDetails: AchievementType | null
  activeEmployeeList: IncomingActiveEmployee[]
  error: ValidationError
  employeeData: IncomingEmployeeImageData
}
