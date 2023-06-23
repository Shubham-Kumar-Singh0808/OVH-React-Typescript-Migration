import { UserAccessToFeatures } from '../../Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { LoadingState, ValidationError } from '../../commonTypes'

export type CategoryList = {
  id: number
  categoryName: string
  createdBy: string
  updatedBy: string | null
  createdDate: string
  updatedDate: string | null
}

export type CategoryListSliceState = {
  getAllCategory: CategoryList[]
  isLoading: LoadingState
  error: ValidationError
  currentPage: number
  pageSize: number
}

export type ExpenseCategoryTableProps = {
  userAccess: UserAccessToFeatures | undefined
  updateaccess?: boolean
  userEditAccess?: boolean
}
