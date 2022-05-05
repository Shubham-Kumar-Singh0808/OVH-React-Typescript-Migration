import { ValidationErrorType } from '../../commonTypes'
export type FamilyDetailsModal = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth: string
  employeeId: number | string
}
export type UserHeaders = {
  employeeId: number | string
}
export type PersonalInfoTabStateType = {
  getFamilyDetails: FamilyDetailsModal[]
  isLoading: boolean
  error: ValidationErrorType
}
