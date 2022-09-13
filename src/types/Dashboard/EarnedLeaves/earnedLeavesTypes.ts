import { LoadingState, ValidationError } from '../../commonTypes'

export type FinancialYear = {
  value: number
}

export type EarnedLeavesSliceState = {
  financialYear: number
  isLoading: LoadingState
  error: ValidationError
}
