export type Category = {
  categoryId: number
  categoryType: string
  employeeSkill: null
}

export type CategorySliceState = {
  categoryList: Category[]
  isLoading: boolean
}
