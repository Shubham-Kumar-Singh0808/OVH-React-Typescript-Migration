import { LoadingState, ValidationError } from '../../commonTypes'

export type Cycle = {
  active: boolean
  cycleId: number
  cycleName: string
  endDate: string
  startDate: string
}

export type ITDeclarationListSliceState = {
  isLoading: LoadingState
  error: ValidationError
  cycles: Cycle[]
}
