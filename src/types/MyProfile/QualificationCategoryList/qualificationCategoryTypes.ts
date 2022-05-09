export type QualificationCategoryListItem = {
  id?: number
  qualificationCategory: string
  qualificationName: string
}

export type QualificationCategoryState = {
  qualificationCategoryList: QualificationCategoryListItem[]
  isLoading: boolean
}

export type NewQualificationCategory = {
  qualificationCategory: string
  qualificationName: string
}
