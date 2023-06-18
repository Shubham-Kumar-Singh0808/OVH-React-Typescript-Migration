import { ApiLoadingState } from '../../../middleware/api/apiList'

export type CompaniesListTableProps = {
  endIndex: number
  searchCompany: string
  selectionTechnology: string
  startIndex: number
}

export type CompaniesListResponse = {
  companyNmae: string
  candidatesCount: number
  employeesCount: number
}

export type CompaniesListTotalInfo = {
  size: number
  list: CompaniesListResponse[]
}

export type CompaniesListSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  companiesListResponseDetails: CompaniesListResponse
  companiesListData: CompaniesListResponse[]
}

export type CompaniesListProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
