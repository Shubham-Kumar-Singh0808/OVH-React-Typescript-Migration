import { ValidationError, LoadingState } from '../../../commonTypes'

export type CertificateType = {
  name?: string
  certificateType: string
  id?: number
  technologyId: number
  technologyName?: string
}

export type AddCertificateTypeProps = {
  selectedTechnologyId: number
  setSelectedTechnologyId: (value: number) => void
}

export type CertificateTypeTableProps = {
  certificateTypes: CertificateType[]
  actionMapping: ActionMapping
  getToastMessage: (value: string) => JSX.Element
}
export type ActionMapping = {
  added?: string
  deleted: string
  updated: string
}

export type CertificateTypeSliceState = {
  certificateTypes: CertificateType[]
  isLoading: LoadingState
  error: ValidationError
}
