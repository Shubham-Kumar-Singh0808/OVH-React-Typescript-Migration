import { LoadingState } from '../../commonTypes'

export type BirthdaysList = {
  date: string
  id?: null | number
  imagePath?: string
  name: string
  type?: null | string
}

export type BirthdaysListResponse = {
  birthdays: BirthdaysList[]
  size: number
}

export type BirthdayListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type BirthdayListApiProps = {
  endIndex?: number
  startIndex?: number
}

export type BirthdayListTableSliceState = {
  birthdayList: BirthdaysList[]
  isLoading: LoadingState
  listSize: number
}
