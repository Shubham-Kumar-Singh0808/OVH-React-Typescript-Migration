import { LoadingState } from '../../commonTypes'

export type Category = {
  categoryId: number
  categoryType: string
  employeeSkill: null
}

export type CategorySliceState = {
  categories: Category[]
  isLoading: LoadingState
}
