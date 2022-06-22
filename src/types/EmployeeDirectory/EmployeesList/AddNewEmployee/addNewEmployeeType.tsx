import { LoadingState, ValidationError } from '../../../commonTypes'

import { EmployeeShiftDetails } from './ShiftConfiguration/shiftConfigurationTypes'

//AddNewEmployee Post API
export type AddEmployee = {
  contractEndDate?: Date
  contractExists: string
  contractStartDate?: Date
  country: string
  dateOfJoining: Date
  departmentName: string
  designation: string
  dob: Date
  employmentTypeName: string
  experience: number
  firstName: string
  gender: string
  hrAssociate: GetHrData
  jobTypeName: string
  lastName: string
  manager: GetAllReportingManagers
  projectManager: GetAllReportingManagers
  role: string
  technology: string
  timeSlotDTO: EmployeeShiftDetails
  userName: string
  workStatus: string
}

//AddNewEmployee child component types
export type EmployeeDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type GetAllTechnology = {
  id: number
  name: string
}
export type GetCountries = {
  id: number
  name: string
}

export type GetHrData = {
  id: number
  fullName: string
}

export type GetAllReportingManagers = {
  id: number
  fullName: string
}

export type EmployeeShift = {
  id: number
  name: string
}

export type Label = {
  htmlFor: string
  className: string
}

export type GetList = {
  id: number
  name: string
}

export type GetReportManager = {
  id: number
  fullName: string
}

export type GetProjectManager = {
  id: number
  fullName: string
}

export type GetHRAssociate = {
  id: number
  fullName: string
}

//AddNewEmployee functions and Props types for child components
export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => Label
}

export interface ExperienceChangeHandlerProp extends DynamicFormLabelProps {
  onExperienceHandler: (experience: number) => void
  experienceValue: number
}

export interface WorkFromChangeHandlerProp extends DynamicFormLabelProps {
  onWorkFromHandler: (from: string) => void
  workFromValue: string
}

export interface UsernameEmailChangeHandlerProp extends DynamicFormLabelProps {
  usernameChangeHandler: (username: string) => void
  username: string
}

export interface FullNameChangeHandlerProp extends DynamicFormLabelProps {
  firstNameChangeHandler: (firstName: string) => void
  lastNameChangeHandler: (lastName: string) => void
  middleNameChangeHandler: (middleName: string) => void
  firstNameValue: string
  lastNameValue: string
  middleNameValue: string
}

export interface DateChangeHandlerProp extends DynamicFormLabelProps {
  onDateChangeHandler: (e: Date) => void
  dateValue: Date
}

export interface StartEndDateChangeHandlerProp extends DynamicFormLabelProps {
  onStartDateChangeHandler: (start: Date) => void
  onEndDateChangeHandler: (end: Date) => void
  onContractExistHandler: (isDisable: string) => void
  startDateValue: Date
  endDateValue: Date
  isContractExist: string
}

export interface UserNameProps extends DynamicFormLabelProps {
  userName: string
}
export interface EmployeeDepartmentProps extends DynamicFormLabelProps {
  departmentsList: EmployeeDepartment[]
  setDepartmentValue: (value: string) => void
  departmentValue: string
}
export interface TechnologyProps extends DynamicFormLabelProps {
  technologyList: GetAllTechnology[]
  setTechnologyValue: (value: string) => void
  technologyValue: string
}

export interface SelectProps extends DynamicFormLabelProps {
  list: GetList[]
  setValue: (value: string) => void
  value: string
  name: string
  label: string
}
export interface CountryProps extends DynamicFormLabelProps {
  countryList: GetCountries[]
}

export interface HrDataProps extends DynamicFormLabelProps {
  hrDataList: GetHrData[]
  onSelectHRAssociate: (value: GetHRAssociate) => void
}

export interface ReportManagerProps extends DynamicFormLabelProps {
  reportManagersList: GetAllReportingManagers[]
  onSelectReportManager: (value: GetReportManager) => void
}
export interface ManagerProps extends DynamicFormLabelProps {
  managersList: GetAllReportingManagers[]
  onSelectManager: (value: GetProjectManager) => void
}
export interface EmployeeShiftProps extends DynamicFormLabelProps {
  employeeShifts: EmployeeShiftDetails[]
  setShiftName: (value: string) => void
  shiftName: string
  setToggleShift: (value: boolean) => void
}

export interface ToggleShiftProp {
  setToggleShift: (value: boolean) => void
}

export interface EmployeeGenderProps extends DynamicFormLabelProps {
  setEmployeeGender: (value: string) => void
  employeeGender: string
}

//AddNewEmployee export as main object
export type AddNewEmployeeState = {
  employeeDepartments?: EmployeeDepartment[]
  technologies?: GetAllTechnology[]
  countries?: GetCountries[]
  hrData?: GetHrData[]
  reportingManagers?: GetAllReportingManagers[]
  error: ValidationError
  isLoading: LoadingState
  addEmployee?: AddEmployee
}
