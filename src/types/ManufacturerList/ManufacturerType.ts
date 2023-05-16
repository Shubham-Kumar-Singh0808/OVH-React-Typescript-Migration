import { LoadingState } from '../commonTypes'

export type ManufacturerDetails = {
  assetType: string
  assetTypeId: number
  createdBy: string
  createdDate: string
  departmentId: null
  departmentName: null
  productId: number
  productName: string
  updatedBy: string
  updatedDate: string
}

export type GetAllManufacturerName = {
  size: number
  list: ManufacturerDetails[]
}

export type ManufacturerListSliceState = {
  manufacturerDetails: ManufacturerDetails[]
  getAllManufacturerName: GetAllManufacturerName
  isLoading: LoadingState
}

export type ManufacturerListProps = {
  endIndex: number
  manufacturerName: string
  startIndex: number
}
