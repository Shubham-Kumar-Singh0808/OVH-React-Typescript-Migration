import { ValidationError, LoadingState } from '../../../commonTypes'

export type Technology = {
  id: number
  name: string
}

export type CertificateTypeSliceState = {
  Technology: Technology[]
  isLoading: LoadingState
  error: ValidationError
}
