import { LoadingState } from '../../commonTypes'

export type EmployeeHandbookTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type EmployeeHandbookCountry = {
  id: number
  name: string
}

export type EmployeeHandbook = {
  id: number
  displayOrder: number
  title: string
  description: string
  pageName: string
  handCountry: EmployeeHandbookCountry[]
}

export type EmployeeHandbookListApiProps = {
  endIndex?: number
  startIndex?: number
}

export type EmployeeHandbookListResponse = {
  list: EmployeeHandbook[]
  size: number
}

export type EmployeeHandbookListSliceState = {
  listSize: number
  isLoading: LoadingState
}
