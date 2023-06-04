import { LoadingState } from '../../commonTypes'

export type AssetTypeAddList = {
  amount: string
  assetNumber: string
  assetTypeId: string
  countryId: number
  invoiceNumber: string
  manufacturerId: string
  notes: string
  otherAssetNumber: string
  pSpecification: string
  poNumber: string
  productId: string
  purchasedDate: string
  receivedDate: string
  status: string
  vendorId: string
  warrantyEndDate: string
  warrantyStartDate: string
}

export type AddEditSliceState = {
  isLoading: LoadingState
  listSize: number
}

export type UpdateAssetListSliceState = {
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
