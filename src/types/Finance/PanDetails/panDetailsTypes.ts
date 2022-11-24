import { LoadingState, ValidationError } from '../../commonTypes'

export type BankInformation = {
  bankinfo: BankInfo[]
  finance: Finance
}

export type BankInfo = {
  bankId: number
  bankName: string
  bankAccountNumber: string
  employeeId: number
  ifscCode: null | string
}

export type PanDetailsSliceState = {
  bankInfo: BankInformation
  isLoading: LoadingState
  error: ValidationError
}

export type UploadPanDetail = {
  financeId: number
  file: FormData
}

export type Finance = {
  financeId: number
  pfAccountNumber: string
  panCardAccountNumber: string
  uaNumber: string
  employeeId: number
  aadharCardNumber: string
  financeFilePath: null
  financeFileName: null
}
