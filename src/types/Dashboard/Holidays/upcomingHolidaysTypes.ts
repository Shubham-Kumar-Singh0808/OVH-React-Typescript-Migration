import { LoadingState, ValidationError } from '../../commonTypes'

export type Holidays = {
  id: number
  date: string
  name: string
  fullDate: string
  week: string
  country: string
}

export type HolidaysListProps = {
  selectedCountry: string
  // setSelectedCountry: (value: string) => void
}

export type backButtonProp = {
  editHolidayButtonHandler: (id: number) => void
}

export type SaveHoliday = {
  country: string
  date: string
  name: string
}

export type EditHolidayDetails = {
  country: string
  date: string
  fullDate: null
  id: number
  name: string
  week: null
}

export type holidaysPageProps = {
  selectedHoliday?: number
}

export type HolidaysSliceState = {
  selectedEmployeeCountry: string
  isLoading: LoadingState
  upcomingHolidays: Holidays[]
  addNewHoliday: SaveHoliday
  editHoliday: EditHolidayDetails
  refreshList: boolean
  currentPage: number
  pageSize: number
  error: ValidationError
}
