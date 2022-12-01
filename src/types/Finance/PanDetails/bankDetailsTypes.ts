import { LoadingState, ValidationError } from '../../commonTypes'

export type BankNameLookup = {
  bankId: number
  bankName: string
}
export type BankDetailsSliceState = {
  bankNameList: BankNameLookup[]
  isLoading: LoadingState
  error: ValidationError
  editBankAccount: EditBankInformation
}

export type EditBankInformation = {
  bankId: number
  bankName: string
  bankAccountNumber: string
  employeeId: number
  ifscCode: null | string
}

export type SaveData = {
  bankAccountNumber: string
  bankName: string
  employeeId: number | string
  ifscCode: string
}
