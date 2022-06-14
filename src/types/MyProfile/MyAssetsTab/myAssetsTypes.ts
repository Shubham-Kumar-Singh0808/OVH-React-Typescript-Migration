import { ValidationError } from '../../commonTypes'
export type EmployeeMyAssets = {
  assetNumber: string
  assetType: string
  productName: string
  pSpecification: string
  location: string
  status: string
  employeeName: string
  empId: number
}

export type MyAssetsTabState = {
  employeeMyAssets: EmployeeMyAssets[]
  isLoading: boolean
  error: ValidationError
}
