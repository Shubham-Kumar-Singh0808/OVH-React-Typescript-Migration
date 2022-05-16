export type CategoryListItem = {
  categoryId: number
  categoryType: string
  employeeSkill: null
}

export type CategoryState = {
  categoryList: CategoryListItem[]
  isLoading: boolean
}
