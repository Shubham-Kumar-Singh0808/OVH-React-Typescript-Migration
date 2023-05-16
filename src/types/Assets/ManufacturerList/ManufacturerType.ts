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

export type ManufacturerListSliceState = {
  manufacturerDetails: ManufacturerDetails[]
  getAllManufacturerName: GetAllManufacturerName
  listSize: number
  isLoading: LoadingState
}

export type ManufacturerListProps = {
  endIndex: number
  manufacturerName: string
  startIndex: number
}
