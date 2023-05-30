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

export type WarrantyAssetsListSliceState = {
  assetTransactionakDetails: AssetTransactionalList[]
  getAssetTransactionList: GetAssetTransactionList
  listSize: number
  isLoading: LoadingState
}
