import { LoadingState, ValidationError } from '../../commonTypes'

export type SubCategoryListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type TicketConfigurationDepartments = {
  id: number
  name: string
}

export type TicketConfigurationCategories = {
  categoryId: number
  categoryName: string
  departmentId: number
  departmentName: string
  mealType: boolean
}

export type TicketConfigurationSubCategories = {
  subCategoryId: number
  subCategoryName: string
  estimatedTime: string
  workFlow: boolean
  categoryId: number
  categoryName: string
  departmentName: string
  departmentId: number
  levelOfHierarchy: string
}

export type TicketConfigurationState = {
  departments: TicketConfigurationDepartments[]
  categories: TicketConfigurationCategories[]
  subCategories: TicketConfigurationSubCategories[]
  subCategoryList: TicketConfigurationSubCategoryList
  selectedDepartment: string
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}

export type TicketConfigurationSubCategoryList = {
  size: number
  list?: TicketConfigurationList[]
}

export type TicketConfigurationSubCategoryType = {
  categoryId?: number
  departmentId: number
  subCategoryId?: number
  endIndex: number
  startIndex: number
}

export type TicketConfigurationList = {
  subCategoryId: number
  subCategoryName: string
  estimatedTime: number | string
  workFlow: boolean
  categoryId: number
  categoryName: string
  departmentName: string
  departmentId: number
  levelOfHierarchy: number | string
}
