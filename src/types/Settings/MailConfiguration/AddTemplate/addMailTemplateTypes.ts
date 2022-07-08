import { LoadingState, ValidationError } from '../../../commonTypes'

export type AssetType = {
  id: number
  assetType: string
}

export type AssetTypeResponse = {
  assetTypeList: AssetType[]
}

export type AddNewTemplate = {
  templateTypeId: number
  templateName: string
  template: string
  email?: string
  assetTypeId?: string | number
}
export type AddTemplateSliceState = {
  getAllLookups: AssetTypeResponse
  isLoading: LoadingState
  error: ValidationError
}
