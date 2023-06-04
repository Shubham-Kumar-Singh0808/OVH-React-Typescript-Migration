import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { LoadingState } from '../../commonTypes'

export type VendorDetails = {
  amount: string
  assetNumber: string
  assetType: string
  assetTypeId: number
  countryId: number
  createdBy: string
  createdDate: string
  departmentId: null
  departmentName: null
  description: null
  employeeId: null
  employeeName: null
  id: number
  invoiceNumber: string
  location: null
  manufacturerId: number
  manufacturerName: string
  notes: string
  otherAssetNumber: string
  otherNumber: null
  pSpecification: string
  poNumber: string
  productId: number
  productName: string
  productSpecification: null
  productSpecificationId: number
  purchasedDate: string
  receivedDate: string
  referenceNumber: null
  searchByEmpName: null
  status: string
  updatedBy: string
  updatedDate: string
  vendorId: number
  vendorName: string
  warrantyEndDate: string
  warrantyStartDate: string
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
