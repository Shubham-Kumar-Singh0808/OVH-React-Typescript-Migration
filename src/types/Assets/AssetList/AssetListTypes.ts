import { LoadingState } from '../../commonTypes'

export type AssetTypeChangeList = {
  productId: number
  productName: string
  assetTypeId: null | number
  assetType: string
  departmentId: null
  departmentName: null
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type AssetListSliceState = {
  asset: AssetTypeChangeList[]
  isLoading: LoadingState
  manufacturerList: ManufacturerList
  allAssetList: AllAssetsList[]
  listSize: number
}

export type ManufacturerList = {
  assetTypeList: AssetTypeList[]
  manufacturerList: ManufactureData[]
  productList: ProductList[]
  vendorList: VendorList[]
}
export type EmpDepartment = {
  allocationSupportFlag: boolean
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
}
export type AssetTypeList = {
  assetType: string
  EmpDepartment: EmpDepartment
  id: number
}
export type product = {
  assetType: AssetTypeList
  createdBy: null
  createdDate: null
  empDepartment: EmpDepartment
  productId: number
  productName: string
  updatedBy: null | string
  updatedDate: null | string
}
export type ManufactureData = {
  createdBy: null | string
  createdDate: null | string
  empDepartment: EmpDepartment
  manufacturerId: number
  manufacturerName: string
  product: product
  updatedBy: null | string
  updatedDate: null | string
}
export type ProductList = {
  assetType: AssetTypeList
  createdBy: null
  createdDate: null
  empDepartment: EmpDepartment
  productId: number
  productName: string
  updatedBy: null
  updatedDate: null
}
export type VendorList = {
  createdBy: null | string
  createdDate: null | string
  empDepartment: EmpDepartment
  isExpenseVendor: boolean
  updatedBy: null
  updatedDate: null
  vendorAddress: string
  vendorBankDetails: null
  vendorCity: string
  vendorCountry: string
  vendorEmailId: string
  vendorFaxNumber: null
  vendorGSTNumber: null
  vendorId: number
  vendorName: string
  vendorPhoneNumber: string
  vendorPincode: string
  vendorState: string
}
export type GetAssetTypeListData = {
  manufacturerList: ManufacturerList
}
// ---------------------------------
export type AllAssetsList = {
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
  employeeName: string
  employeeId: number
  description: string
  status: string
  assetTypeId: number
  assetType: string
  productSpecification: null
  otherNumber: null
  warrantyStartDate: string | null
  warrantyEndDate: string | null
  searchByEmpName: null
  departmentId: null
  departmentName: null
  location: string
  vendorName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  referenceNumber: string
  amount: number
  countryId: number | null
}

export type AllAssetData = {
  size: number
  list: AllAssetsList[]
}

export type AllAssetListProps = {
  assetTypeId: number | string
  dateSelection: string
  endIndex: number
  multipleSearch: string
  productId: number | string
  searchByEmpName: boolean
  selectionStatus: string
  startIndex: number
  status: string
  fromDate: string
  toDate: string
}

export type AssetListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setChangeReportStatus: React.Dispatch<React.SetStateAction<AllAssetsList>>
}
