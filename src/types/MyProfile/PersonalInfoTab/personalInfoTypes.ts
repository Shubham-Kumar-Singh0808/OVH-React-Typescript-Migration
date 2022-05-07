// export type FamilyDetailsModal = {
//   familyId: number
//   personName: string
//   relationShip: string
//   contactNumber: string
//   dateOfBirth: string
//   employeeId: number | string
// }

// export type FamilyDetailsArrayModal = {
//   familyDetails: FamilyDetailsModal[]
//   isLoading: boolean
// }

// export type UserHeaders = {
//   employeeId: number | string
// }
// export interface FamilyInfo {
//   isFieldDisabled: boolean
//   striped: boolean
//   bordered: boolean
//   tableClassName: string
// }

import { ValidationError } from '../../commonTypes'
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
  addFamilyState: EmployeeFamilyDetails
  isLoading: boolean
  error: ValidationError
}

export type EmployeeFamilyDetails = {
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
  familyId?: number
}
export interface FamilyInfo {
  isFieldDisabled: boolean
  striped: boolean
  bordered: boolean
  tableClassName: string
}
