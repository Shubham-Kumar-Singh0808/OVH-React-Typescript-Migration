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
export type GetAssetTypeListDetails = {
  length: number
  assetType: AssetType[]
}
export type AssetTypeListSliceState = {
  assetType: AssetType[]
  getAssetTypeListDetails: GetAssetTypeListDetails
  isLoading: LoadingState
  productType: ProductType[]
  getProductTypeListDetails: GetProductTypeListDetails
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
export type GetProductTypeListDetails = {
  length: number
  productType: ProductType[]
}
