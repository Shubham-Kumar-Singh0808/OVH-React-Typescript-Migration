import { ValidationError } from '../../commonTypes'

export type EmployeeAsset = {
  assetNumber: string
  assetType: string
  productName: string
  pSpecification: string
  location: string
  status: string
  employeeName: string
  empId: number
}

export type EmployeeAssetsState = {
  employeeAssets: EmployeeAsset[]
  LoadingState: boolean
  error: ValidationError
}
