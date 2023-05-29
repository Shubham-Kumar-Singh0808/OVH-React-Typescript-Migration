import { LoadingState } from '../../commonTypes'

export type VendorDetails = {
  vendorId: number
  vendorName: string
  vendorAddress: string
  vendorCity: string
  vendorState: string
  vendorPincode: string
  vendorCountry: string
  vendorEmailId: string
  vendorPhoneNumber: string
  vendorFaxNumber: null | string
  departmentId: number
  departmentName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  isExpenseVendor: boolean
  vendorBankDetails: null | string
  vendorGSTNumber: null | string
}

export type GetAllVendorDetails = {
  size: number
  list: VendorDetails[]
}

export type VendorListApiProps = {
  endIndex?: number
  startIndex?: number
  vendorName?: string
  vendorNameSearch?: string
  searchText?: string
}

export type VendorListSliceState = {
  vendors: VendorDetails[]
  listSize: number
  getAllVendorDetails: GetAllVendorDetails
  isLoading: LoadingState
}

export type VendorListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  updateaccess?: boolean
  userEditAccess?: boolean
}
