import { ValidationError } from '../../commonTypes'

export type EmployeeGeneralInformation = {
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

export interface EmployeeGeneralInformationState
  extends EmployeeGeneralInformation {
  generalInformation: EmployeeGeneralInformation
  error: ValidationError
  isLoading: boolean
}
