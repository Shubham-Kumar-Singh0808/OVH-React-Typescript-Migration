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
