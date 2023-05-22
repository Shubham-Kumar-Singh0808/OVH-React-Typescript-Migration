import { LoadingState } from '../../commonTypes'

export type AssetType = {
  id: number
  assetType: string
  empDepartment: EmpDepartment
}

export type EmpDepartment = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type Product = {
  productId: number
  productName: string
  assetType: AssetType
  empDepartment: EmpDepartment
  createdBy: string | null
  updatedBy: string | null
  createdDate: string | null
  updatedDate: string | null
}

export type Manufacturer = {
  manufacturerId: number
  manufacturerName: string
  product: Product
  empDepartment: EmpDepartment
  createdBy: string | null
  updatedBy: string | null
  createdDate: string | null
  updatedDate: string | null
}

export type AssetTypeChangeList = {
  productId: number
  productName: string
  assetTypeId: null
  assetType: string
  departmentId: null
  departmentName: null
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type GetAllLookUpList = {
  manufacturerList: Manufacturer[]
}

export type AssetAllLookUpsSliceState = {
  manufacturerList: Manufacturer[]
  getAllLookupsDetails: GetAllLookUpList
  isLoading: LoadingState
}
export type GetAssetTypeChangeListDetails = {
  list: AssetTypeChangeList[]
}

export type AssetListSliceState = {
  asset: AssetTypeChangeList[]
  getAssetTypeChangeListDetails: GetAssetTypeChangeListDetails
  isLoading: LoadingState
}

export type AssetTypeChangeListApiProps = {
  id: number
}
