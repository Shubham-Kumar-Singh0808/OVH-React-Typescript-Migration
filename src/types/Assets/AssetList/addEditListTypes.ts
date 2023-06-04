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
  departmentId: number
  departmentName: string
  description: string
  employeeId: number
  employeeName: string
  id: number
  invoiceNumber: string
  location: string
  manufacturerId: number
  manufacturerName: string
  notes: string
  otherAssetNumber: string
  otherNumber: string
  pSpecification: string
  poNumber: string
  productId: number
  productName: string
  productSpecification: string
  productSpecificationId: number
  purchasedDate: string
  receivedDate: string
  referenceNumber: string
  searchByEmpName: string
  status: string
  updatedBy: string
  updatedDate: string
  vendorId: number
  vendorName: string
  warrantyEndDate: string
  warrantyStartDate: string
}
