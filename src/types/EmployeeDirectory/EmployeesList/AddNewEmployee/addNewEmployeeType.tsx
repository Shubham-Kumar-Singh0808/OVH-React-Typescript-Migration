import { EmployeeShiftDetails } from './ShiftConfiguration/shiftConfigurationTypes'
import { LoadingState, ValidationError } from '../../../commonTypes'

//AddNewEmployee Post API
export type AddEmployee = {
  contractEndDate: string
  contractExists: boolean
  contractStartDate: string
  country: string
  dateOfJoining: string
  departmentName: string
  designation: string
  dob: string
  employmentTypeName: string
  experience: number | string
  middleName: string
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
export type UserType = {
  isUserExist: boolean
}

export type EmployeeDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}
export type GetAllJobType = {
  id: number
  jobType: string
}
export type GetAllEmployment = {
  id: number
  employmentType: string
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
  firstName?: string
  lastName?: string
}

export type GetAllReportingManagers = {
  id: number
  fullName: string
  firstName: string
  lastName: string
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
  firstName: string
  lastName: string
}

export type GetProjectManager = {
  id: number
  fullName: string
  firstName: string
  lastName: string
}

export type GetHRAssociate = {
  id: number
  fullName: string
  firstName?: string
  lastName?: string
}

//AddNewEmployee functions and Props types for child components
export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => Label
}

export interface ExperienceChangeHandlerProp extends DynamicFormLabelProps {
  onExperienceHandler: (experience: number) => void
  experienceValue: number | string
}

export interface WorkFromChangeHandlerProp extends DynamicFormLabelProps {
  onWorkFromHandler: (from: string) => void
  workFromValue: string
}

export interface UsernameEmailChangeHandlerProp extends DynamicFormLabelProps {
  usernameChangeHandler: (username: string) => void
  onAllowedUserChangeHandler: (username: string) => void
  username: string
  isUserAllowed: boolean
  userEmployeeName?: string
  setUserEmployeeName: React.Dispatch<React.SetStateAction<string>>
}

export interface InputField extends DynamicFormLabelProps {
  onChangeHandler?: (username: string) => void
  onBlurHandler?: (username: string) => void
  value: string
  type?: string
  isRequired: boolean
  label: string
  name: string
  placeholder: string
  autoComplete: string
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
  dateValue: string
}

export interface StartEndDateChangeHandlerProp extends DynamicFormLabelProps {
  onStartDateChangeHandler: (start: Date) => void
  onEndDateChangeHandler: (end: Date) => void
  onContractExistHandler: (isDisable: boolean) => void
  startDateValue: string
  endDateValue: string
  isContractExist: boolean
  isRequired: boolean
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
export interface SelectShiftProps extends DynamicFormLabelProps {
  list: EmployeeShiftDetails[]
  setValue: (value: EmployeeShiftDetails) => void
  setToggleShift: (value: boolean) => void
  value: string
  toggleValue: boolean
  isAddDisable: boolean
  isRequired: boolean
}
export interface SelectDesignationProps extends DynamicFormLabelProps {
  list: GetList[]
  setValue: (value: string) => void
  setToggleShift: (value: boolean) => void
  value: string
  toggleValue: boolean
  isAddDisable: boolean
  isRequired: boolean
}
export interface SelectProps extends DynamicFormLabelProps {
  list: GetList[]
  setValue?: (value: string) => void
  value?: string
  name?: string
  label?: string
  placeHolder?: string
  isRequired: boolean
}
export interface StatusProps extends DynamicFormLabelProps {
  list: GetList[]
  setStatusValue: (value: string) => void
  setStatusDateValue: (value: Date) => void
  dateValue: string
  value: string
  isRequired: boolean
}
export interface CountryProps extends DynamicFormLabelProps {
  countryList: GetCountries[]
}

export interface HrDataProps extends DynamicFormLabelProps {
  hrDataList: GetHrData[]
  onSelectHRAssociate: (value: GetHRAssociate) => void
  shouldReset: boolean
  hrValue: string
  isRequired: boolean
}

export interface ReportManagerProps extends DynamicFormLabelProps {
  reportManagersList: GetAllReportingManagers[]
  onSelectReportManager: (value: GetReportManager) => void
  shouldReset: boolean
  reportValue: string
  isRequired: boolean
}
export interface ManagerProps extends DynamicFormLabelProps {
  managersList: GetAllReportingManagers[]
  onSelectManager: (value: GetProjectManager) => void
  shouldReset: boolean
  projectValue: string
  isRequired: boolean
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
  employments?: GetAllEmployment[]
  jobTypes?: GetAllJobType[]
  userType?: boolean
}

// Reset Fields
export type ShouldResetFields = {
  hrAssociate: boolean
  projectManager: boolean
  reportManager: boolean
}
