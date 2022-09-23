import { LoadingState, ValidationError } from '../../commonTypes'

export type BirthDayApiProps = {
  endIndex?: number
  startIndex?: number
}

export type Birthdays = {
  date: string
  id: null
  imagePath: string
  name: string
  type: null
}

export type UpcomingBirthdayResponse = {
  birthdays: Birthdays[]
  size: number
}

export type EmployeeBirthdaySliceState = {
  upcomingBirthdays: Birthdays[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
