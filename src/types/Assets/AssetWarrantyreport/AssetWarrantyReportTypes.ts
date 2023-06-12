import { LoadingState } from '../../commonTypes'

export type WarrantyAssetsList = {
  id: number
  poNumber: string
  vendorId: number
  productSpecificationId: number
  manufacturerId: number
  productId: number
  pSpecification: string
  productName: string
  manufacturerName: string
  assetNumber: string
  otherAssetNumber: string
  invoiceNumber: string
  purchasedDate: string
  receivedDate: string
  notes: null | string
  employeeName: string | null
  employeeId: number | null
  description: null
  status: string
  assetTypeId: number
  assetType: string
  productSpecification: null
  otherNumber: null
  warrantyStartDate: string
  warrantyEndDate: string
  searchByEmpName: null
  departmentId: null
  departmentName: null
  location: string | null
  vendorName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  referenceNumber: string | null
  amount: string | null
  countryId: number
}

export type GetWarrantyAssetsList = {
  size: number
  list: WarrantyAssetsList[]
}

export type WarrantyAssetsListSliceState = {
  warrantyAssetsDetails: WarrantyAssetsList[]
  getWarrantyAssetsList: GetWarrantyAssetsList
  listSize: number
  isLoading: LoadingState
}

export type AssetsWarrantyListProps = {
  dateSelection: string
  endIndex: number
  from: string
  startIndex: number
  to: string
}

export type AssetsWarrantyListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type ExportAssetWarrantyListProps = {
  from: string
  to: string
  dateSelection: string
  startIndex: number
  endIndex: number
  token: string
}
