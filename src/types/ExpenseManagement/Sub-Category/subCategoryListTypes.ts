import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { LoadingState } from '../../commonTypes'

export type CategoryList = {
  id: number
  categoryName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type SubCategoryList = {
  id: number
  categoryId: number
  categoryName: string
  subCategoryName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

// export type AddSubCategoryList = {
//   id: number
//   categoryId: number
//   categoryName: string
//   subCategoryName: string
//   createdBy: string
//   updatedBy: string
//   createdDate: string
//   updatedDate: string
// }

export type SubCategoryListSliceState = {
  isLoading: LoadingState
  expenseCategories: CategoryList[]
  subExpenseCategories: SubCategoryList[]
  currentPage: number
  pageSize: number
}

export type SubCategoryListTableProps = {
  paginationRange: number[]
  currentPage: number
  pageSize: number
  userAccess: UserAccessToFeatures | undefined
  updateaccess?: boolean
  userEditAccess?: boolean
}
