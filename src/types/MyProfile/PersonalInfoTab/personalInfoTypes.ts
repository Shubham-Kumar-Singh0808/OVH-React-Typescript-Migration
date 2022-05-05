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
  getVisaDetails: VisaDetailsModal[]
  isLoading: boolean
  error: ValidationErrorType
}
export type VisaDetailsModal = {
  id: number | string
  empId: number | string
  empName: string
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
  dateOfIssue: string
  dateOfExpire: string
  //   employeeId: number | string
}
