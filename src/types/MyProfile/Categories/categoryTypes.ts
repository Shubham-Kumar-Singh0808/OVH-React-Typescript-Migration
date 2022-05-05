export type CategoryListItemType = {
  categoryId: number
  categoryType: string
  employeeSkill: null
}

export type CategoryStateType = {
  categoryList: CategoryListItemType[]
  isLoading: boolean
}
