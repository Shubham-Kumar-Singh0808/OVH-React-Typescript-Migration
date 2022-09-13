import { LoadingState, ValidationError } from '../../commonTypes'

export type TimeInOffice = {
  empID: string
  empName: string
  totalSpentHours: string
  totalTimeInOfficeHours: null
  date: string
  month: null
  week: string
  dayList: null
  inOfficeDTOs: null
}

export type EmployeeTimeInOfficeSliceState = {
  timeInOffice: TimeInOffice[]
  isLoading: LoadingState
  error: ValidationError
}
