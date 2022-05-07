import { ValidationError } from '../../commonTypes'

export type EmployeeGeneralInformationDataModel = {
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

export interface EmployeeGeneralInformationStateType
  extends EmployeeGeneralInformationDataModel {
  generalInformation: EmployeeGeneralInformationDataModel
  error: ValidationError
  isLoading: boolean
}
