import { LoadingState } from '../../commonTypes'

export type AssetTransactionalList = {
  id: number
  assetNumber: string
  productName: string
  pSpecification: string
  employeeName: string
  employeeId: null
  assignedDate: null
  description: string
  status: string
  date: string
  updatedBy: string
  location: string
  referenceNumber: string
  vendorName: string
  vendorId: null
  assetId: number
  productId: null
  multipleSearch: null
  searchByEmpName: null
  locationForEmpAssets: null
  invoiceNumber: string
  amount: string
}

export type GetAssetTransactionList = {
  size: number
  list: AssetTransactionalList[]
}

export type AssetTransactionListSliceState = {
  assetTransactionakDetails: AssetTransactionalList[]
  getAssetTransactionList: GetAssetTransactionList
  listSize: number
  isLoading: LoadingState
}

export type AssetTransactionListProps = {
  dateSelection: string
  endIndex: number
  from: string
  startIndex: number
  to: string
  assetId?: number | string
  multipleSearch?: string
  productId?: number | string
  searchByEmpName?: boolean
  status?: string
}

export type AssetTransactionListData = {
  assetId: string
  multipleSearch: string
  productId: string
  searchByEmpName: boolean
  status: string
}

export type AssetTransactionListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  isTableView: boolean
}
