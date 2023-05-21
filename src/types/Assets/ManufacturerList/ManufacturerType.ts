import { string } from 'prop-types'
import { LoadingState } from '../../commonTypes'

export type ManufacturerDetails = {
  manufacturerId: number
  manufacturerName: string
  productId: number
  productName: string
  departmentId: null
  departmentName: null
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type GetAllManufacturerName = {
  size: number
  list: ManufacturerDetails[]
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
export type ManufacturerListSliceState = {
  manufacturerDetails: ManufacturerDetails[]
  getAllManufacturerName: GetAllManufacturerName
  listSize: number
  isLoading: LoadingState
  manufacturerList: ManufacturerList
}

export type ManufacturerListProps = {
  search: string
  endIndex: number
  manufacturerName: string
  startIndex: number
}
export type exportManufacturerListProps = {
  manufacturerNameSearch: string
  token: string
}

export type AddManufacturerListProps = {
  manufacturerName: string
  productId: string
}
