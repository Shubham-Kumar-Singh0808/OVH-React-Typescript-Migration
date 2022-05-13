export type QualificationCategoryList = {
  id?: number
  qualificationCategory: string
  qualificationName: string
}

export type QualificationCategoryState = {
  qualificationCategoryList: QualificationCategoryList[]
  isLoading: boolean
}
