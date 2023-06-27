import { LoadingState, ValidationError } from '../../commonTypes'

export type CreditCardList = {
  cardId: number
  cardName: string
  cardNumber: string
  createdBy: string
  updatedBy: null
  createdDate: string
  updatedDate: null
}

export type CreditCardListSliceState = {
  getCardsList: CreditCardList[]
  isLoading: LoadingState
  error: ValidationError
}
