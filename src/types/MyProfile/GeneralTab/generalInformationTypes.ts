import { ValidationErrorType } from '../../commonTypes'

export type GeneralInformationDataModel = {
  baseLocation: string
  curentLocation: string
  address: string
  gender: string
  bloodgroup: string
  realBirthday: string
  maritalStatus: string
  emergencyContact: string
  officialBirthday: string
}
// export type UserHeaders = {
//   employeeId: string | number
// }
// export type ValidationError = number | null

export interface GeneralInformationStateType
  extends GeneralInformationDataModel {
  generalInformation: GeneralInformationDataModel
  error: ValidationErrorType
  isLoading: boolean
}
