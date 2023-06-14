import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
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
  vendorGSTNumber: string | number | string[] | undefined | null
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
  token?: string
}

export type VendorListSliceState = {
  vendors: VendorDetails[]
  listSize: number
  getAllVendorDetails: GetAllVendorDetails
  getVendorById: VendorDetails
  isLoading: LoadingState
}

export type VendorListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditVendorInfo: React.Dispatch<React.SetStateAction<VendorDetails>>
  userAccess: UserAccessToFeatures | undefined
  updateaccess?: boolean
  userEditAccess?: boolean
}
