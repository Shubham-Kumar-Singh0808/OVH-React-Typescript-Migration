import { ValidationError, LoadingState } from '../../../commonTypes'
import {
  GetHrData,
  GetAllReportingManagers,
  EmployeeDepartment,
  GetAllEmployment,
  GetAllJobType,
  GetAllTechnology,
  GetCountries,
} from '../AddNewEmployee/addNewEmployeeType'
import { EmployeeShiftDetails } from '../AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'

export type EditEmployeeTypes = {
  contractEndDate: Date | null
  contractExists: boolean
  contractStartDate: Date | null
  country: string
  dateOfJoining?: Date | null
  departmentName: string
  designation: string
  dob?: Date | null
  employmentTypeName: string
  experience?: number
  statusName: string
  middleName?: string
  firstName?: string
  gender?: string
  hrAssociate: GetHrData
  jobTypeName: string
  lastName?: string
  manager: GetAllReportingManagers
  projectManager: GetAllReportingManagers
  role: string
  technology: string
  timeSlotDTO: EmployeeShiftDetails
  workStatus: string
}

export type EditEmployeeState = {
  employeeDepartments?: EmployeeDepartment[]
  technologies?: GetAllTechnology[]
  countries?: GetCountries[]
  hrData?: GetHrData[]
  reportingManagers?: GetAllReportingManagers[]
  error?: ValidationError
  isLoading: LoadingState
  editEmployee: EditEmployeeTypes
  employments?: GetAllEmployment[]
  jobTypes?: GetAllJobType[]
  userType?: boolean
}
