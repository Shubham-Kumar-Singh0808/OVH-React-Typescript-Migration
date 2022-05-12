import { ValidationErrorType } from '../../commonTypes'
export type FamilyDetailsModal = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth: string
  employeeId: string | number
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
  id: number
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
  visaTypeId: number | string
  visaType: string
  countryId: number | string
  countryName: string
}
export type EmployeeVisaDetails = {
  id?: number | string
  empId: number | string
  empName: string | number
  visaTypeId: number | string
  visaType?: string
  countryId: number | string
  countryName?: string
  dateOfIssue?: string | number | undefined
  dateOfExpire?: string | number | undefined
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

export type AddButtonProps = {
  addButtonHandler: () => void
}
export type EmployeeFamilyDetailsTableProps = {
  editButtonHandler: (familyId: number) => void
}
export type EmployeeVisaDetailsTableProps = {
  editVisaButtonHandler: (id: number) => void
}
