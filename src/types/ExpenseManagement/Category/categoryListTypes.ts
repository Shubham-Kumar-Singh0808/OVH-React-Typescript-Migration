export type CategoryList = {
  id: number
  categoryName: string
  createdBy: string
  updatedBy: string | null
  createdDate: string
  updatedDate: string | null
}

export type CategoryDetails = {
  list: CategoryList[]
}
