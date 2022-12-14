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

export interface AchievementTypeDetailsQueryParameters {
  typeId: number
}

export interface AddAchieverTypeEntriesProps {
  userNewSelectedAchievementType: string
  newAchievementTypeNameHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  newUserSelectedStatus: string
  newAchievementStatusHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedOrder: number | undefined
  newSelectedOrderHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedTimeReq: boolean
  newSelectedTimeReqHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUserSelectedDateReq: boolean
  newSelectedDateReqHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
