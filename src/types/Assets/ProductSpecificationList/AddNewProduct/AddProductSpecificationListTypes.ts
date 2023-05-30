import { LoadingState } from '../../../commonTypes'

export type AssetType = {
  productId: number
  productName: string
  assetTypeId: number
  assetType: string
  departmentId: null
  departmentName: null
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type ProductType = {
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
export type UpdateProductSpecificationTypes = {
  id: number
  productId: number
  productName: string
  manufacturerId: number
  manufacturerName: string
  assetTypeId: number
  assetType: string
  productSpecification: string
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
  departmentId: number | null
  departmentName: string | null
  roleId: number | null
}
export type AssetTypeListSliceState = {
  assetType: AssetType[]
  isLoading: LoadingState
  productType: ProductType[]
  getAssetTypeListData: GetAssetTypeListData
  assetTypeList: AssetTypeList[]
  manufactureList: ManufacturerList
  updateProductSpecification: UpdateProductSpecificationTypes
  getAddBtnProducts: AddBtnProducts
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
export type AddBtnProducts = {
  assetTypeId: string
  manufacturerId: number
  productId: number
  productSpecification: string
}
export type AddProductSpecificationProps = {
  assetTypeId: string
  manufacturerId: number
  productId: number
  productSpecification: string
}
