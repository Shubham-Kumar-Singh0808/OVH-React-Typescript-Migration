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
  setSelectedCountry: (value: string) => void
}

export interface ToggleHolidaysListProp {
  toggleValue: boolean
  setToggleHolidaysList: (value: boolean) => void
}

export type SaveHoliday = {
  country: string
  date: string
  name: string
}

export type HolidaysSliceState = {
  isLoading: LoadingState
  upcomingHolidays: Holidays[]
  addNewHoliday: SaveHoliday
  refreshList: boolean
  currentPage: number
  pageSize: number
  error: ValidationError
}
