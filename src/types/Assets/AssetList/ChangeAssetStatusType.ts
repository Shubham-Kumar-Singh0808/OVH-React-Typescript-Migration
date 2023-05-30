export type SaveEmployee = {
  amount: number
  assetId: number
  date: string | null
  description: string
  employeeId: number
  invoiceNumber: string
  location: string
  locationForEmpAssets: boolean
  referenceNumber: string
  status: string
  vendorId: number
}
export type getAllAssets = {
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
  notes: string
  employeeName: string
  employeeId: number
  description: string | null
  status: string
  assetTypeId: number
  assetType: string
  productSpecification: string | null
  otherNumber: string | null
  warrantyStartDate: string
  warrantyEndDate: string
  searchByEmpName: string | null
  departmentId: string | null
  departmentName: string | null
  location: string
  vendorName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  referenceNumber: string
  amount: string
  countryId: number
}

export type GetAllAssetResponse = {
  list: getAllAssets[]
  size: number
}

export type ChangeAssetStatusSliceState = {
  saveEmployee: SaveEmployee
  getAllAssetResponse: GetAllAssetResponse
}
