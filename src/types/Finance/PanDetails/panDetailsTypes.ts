import { LoadingState, ValidationError } from '../../commonTypes'

export type BankInformation = {
  bankinfo: BankInfo[]
  finance: {
    financeId: number
    pfAccountNumber: string
    panCardAccountNumber: string
    uaNumber: string
    employeeId: number
    aadharCardNumber: string
    financeFilePath: null
    financeFileName: null
  }
}

export type BankInfo = {
  bankId: number
  bankName: string
  bankAccountNumber: string
  employeeId: number
}

export type PanDetailsSliceState = {
  bankInfo: BankInformation
  isLoading: LoadingState
  error: ValidationError
}
