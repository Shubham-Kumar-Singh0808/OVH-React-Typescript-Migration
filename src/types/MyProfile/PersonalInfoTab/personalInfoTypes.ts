import { AutoMap } from '@automapper/classes'
import { EmployeeVisaDetailsDto } from '../../../models/VisaDetailsDto'
import { ValidationError } from '../../commonTypes'

export type EmployeeFamilyData = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth: string
  employeeId: string | number
}

export type PersonalInfoTabState = {
  employeeFamilyDetails: EmployeeFamilyData[]
  employeeVisaDetails: EmployeeVisaDetailsDto[]
  SubCountries: GetCountryDetails
  SubVisa: VisaCountryDetails[]
  editFamilyDetails: EditFamilyDetailsState
  editVisaDetails: EmployeeVisaDetails
  isLoading: boolean
  error: ValidationError
}
export type VisaDetails = {
  id: bigint
  empId: bigint
  empName: string
  visaTypeId?: bigint
  visaType: string
  countryId?: bigint
  countryName: string
  dateOfIssue?: Date
  dateOfExpire?: Date
}
export type EmployeeCountryDetails = {
  id: number
  name: string
}

export type GetCountryDetails = {
  countries: EmployeeCountryDetails[]
}
export type VisaCountryDetails = {
  visaTypeId?: bigint
  visaType: string
  countryId?: bigint
  countryName: string
}

export class EmployeeVisaDetails {
  id?: bigint

  empId?: bigint

  empName?: string

  visaTypeId?: bigint

  visaType?: string

  countryId?: bigint

  countryName?: string

  dateOfIssue?: Date

  dateOfExpire?: Date

  createdBy?: string

  updatedBy?: string

  createdDate?: Date

  updatedDate?: Date

  visaDetailsPath?: string | null

  visaDetailsData?: string | null

  visaThumbPicture?: string | null
}

export type EmployeeVisaDetailsButton = {
  isAddButtonEnabled: boolean
}
export type EditFamilyDetailsState = {
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

export type AddButtonProps = {
  addButtonHandler: () => void
}
export type EmployeeFamilyDetailsTableProps = {
  editButtonHandler?: (familyId: number) => void
  isFieldDisabled?: boolean
  striped?: boolean
  bordered?: boolean
  tableClassName?: string
}
export type EmployeeVisaDetailsTableProps = {
  editVisaButtonHandler: (id: bigint) => void
}
export type handleActiveTabProps = {
  handleActiveTab: (id: number) => void
}

export type cardBodyProps = {
  isViewingAnotherEmployee: boolean | string | undefined
  setToggle: (value: string) => void
  editButtonHandler: (value: number) => void
  editVisaButtonHandler: (value: number) => void
}

export type EmployeePassportImage = {
  empId: number | string
  file1: FormData | null
}
