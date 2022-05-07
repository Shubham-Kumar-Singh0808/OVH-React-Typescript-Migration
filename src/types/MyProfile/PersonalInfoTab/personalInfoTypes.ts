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
  addVisaDetails: EmployeeVisaDetails
  editFamilyDetails: EditFamilyDetailsStateModal
  editVisaDetails: EditVisaDetailsStateModal
  addFamilyState: EmployeeFamilyDetails
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
export type EmployeeVisaDetails = {
  id?: number
  empId: number
  empName: string
  visaTypeId: number
  visaType?: string
  countryId: number
  countryName?: string
  dateOfIssue?: string | number
  dateOfExpire?: string | number
  createdBy?: string
  updatedBy?: string
  createdDate?: string | number
  updatedDate?: string
  visaDetailsPath?: string
  visaDetailsData?: string
  visaThumbPicture?: string | number
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
export type EmployeeFamilyDetails = {
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
  familyId?: number
}
export type AddEditEmployeeFamilyDetails = {
  isEditFamilyDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}
export type AddEditEmployeeVisaDetails = {
  isEditVisaDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}
export type EditVisaDetailsStateModal = {
  id: number
  empId: number
  empName: string
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
  dateOfIssue?: string | number
  dateOfExpire?: string | number
  createdBy: string
  updatedBy: string
  createdDate?: string | number
  updatedDate: string
  visaDetailsPath: string
  visaDetailsData: string
  visaThumbPicture?: string | number
}
