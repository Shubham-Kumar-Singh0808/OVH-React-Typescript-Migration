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
  SubCountries: GetCountryDetailsType
  SubVisa: VisaCountryDetailsModal[]
  addVisaDetails: VisaDetailsStateModal
  editFamilyDetails: EditFamilyDetailsStateModal
  addFamilyState: FamilyDetailsStateModal
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
}
export type CountryDetailsType = {
  id: number
  name: string
}

export type GetCountryDetailsType = {
  countries: CountryDetailsType[]
}
export type VisaCountryDetailsModal = {
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
}
// export type VisaCountryDetailsArrayModal = {
//   visaDetails: VisaCountryDetailsModal[]
//   isLoading: boolean
// }
export type VisaDetailsStateModal = {
  countryId: number
  visaTypeId: number
  dateOfIssue?: string | number
  dateOfExpire?: string | number
  empId: string
}

export type VisaDetailsButton = {
  isAddButtonEnabled: boolean
}
export type EditFamilyDetailsStateModal = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
}
export type FamilyDetailsStateModal = {
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
  familyId?: number
}
